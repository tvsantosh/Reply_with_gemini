console.log("Hello world - JK(Just kidding, this is content.js)");

// Function to find the Gmail compose toolbar
function findComposeToolbar() {
  const selectors = ['.aDh', '.btC', '[role="dialog"] .aDh', '.gU.Up'];
  for (const selector of selectors) {
    const toolbar = document.querySelector(selector);
    if (toolbar) {
      console.log("Found toolbar using selector:", selector);
      return toolbar;
    }
  }
  console.warn("Toolbar not found");
  return null;
}

// Function to get the email content
function getEmailContent() {
  const selectors = ['.h7', '.a3s.aiL', '.gmail_quote', '[role="presentation"]'];
  for (const selector of selectors) {
    const content = document.querySelector(selector);
    if (content) {
      return content.innerText.trim();
    }
  }
  return '';
}

// Create the AI Reply button
function createAIButton() {
  const button = document.createElement('div');
  button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3 ai-reply-button';
  button.innerText = 'AI Reply';
  button.setAttribute('role', 'button');
  button.setAttribute('data-tooltip', 'Generate AI Reply');
  button.style.borderRadius = '10px';
  return button;
}

// Create the tone input field
function createToneInput() {
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Enter decision (e.g., friendly, professional)';
  input.className = 'ai-tone-input';
  input.style.marginLeft = '10px';
  input.style.padding = '5px';
  input.style.borderRadius = '4px';
  input.style.border = '1px solid #ccc';
  return input;
}

// Inject button and tone input into Gmail toolbar
function injectButton() {
  const existingButton = document.querySelector('.ai-reply-button');
  const existingInput = document.querySelector('.ai-tone-input');
  if (existingButton) existingButton.remove();
  if (existingInput) existingInput.remove();

  const toolbar = findComposeToolbar();
  if (!toolbar) {
    console.log("Toolbar not found. Skipping injection.");
    return;
  }

  toolbar.style.display = 'flex';
  toolbar.style.alignItems = 'center';

  const button = createAIButton();
  const toneInput = createToneInput();

  button.addEventListener('click', async () => {
    console.log("AI button clicked");
    button.innerText = 'Generating...';
    button.style.pointerEvents = 'none';

    try {
      const emailContent = getEmailContent();
      const tone = toneInput.value.trim() || "neutral";

      console.log("Email content:", emailContent);
      console.log("Tone:", tone);

      const response = await fetch('http://localhost:8080/api/email/generate', {
        method: 'POST',
        headers: 
        {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          emailContent: emailContent,
          tone: tone
        })
      });

      if (!response.ok) throw new Error('Failed to generate reply');

      const reply = await response.text();
      const composeBox = document.querySelector('[role="textbox"]') || document.querySelector('[contenteditable="true"]');
      if (composeBox) {
        composeBox.focus();
        document.execCommand('insertText', false, reply);
      } 
      else {
        console.error("Compose box not found");
      }
    }

     catch (error) {
      console.error("Error:", error);
    } 

    finally {
      button.innerText = 'AI Reply';
      button.style.pointerEvents = 'auto';
    }
  });

  // Append tone input and button to toolbar
  toolbar.insertBefore(toneInput, toolbar.firstChild);
  toolbar.insertBefore(button, toolbar.firstChild);
}

// Watch for DOM changes (i.e. when compose window opens)
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    const addedNodes = Array.from(mutation.addedNodes);
    const hasCompose = addedNodes.some(node =>
      node.nodeType === Node.ELEMENT_NODE &&
      (
        node.matches?.('.aDh, .btC, [role="dialog"]') ||
        node.querySelector?.('.aDh, .btC, [role="dialog"]')
      )
    );
    if (hasCompose) {
      console.log("Compose window detected");
      setTimeout(injectButton, 500); // Delay to allow toolbar to render
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
