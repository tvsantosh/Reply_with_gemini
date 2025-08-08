package com.email.writer;


import lombok.Data;

@Data
public class EmailRequest {
//content off the mail
    private String emailContent;

    //this set the tone of the mail(funny,casual,serius etc)
    private String tone;

    public String getEmailContent() {
        return emailContent;
    }

    public void setEmailContent( String emailContent ) {
        this.emailContent = emailContent;
    }

    public String getTone() {
        return tone;
    }

    public void setTone( String tone ) {
        this.tone = tone;
    }


}
