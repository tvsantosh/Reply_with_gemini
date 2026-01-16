# Use OpenJDK 21 JRE slim as the base image
FROM openjdk:21-jre-slim

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file from the target directory
COPY target/email-writer-0.0.1-SNAPSHOT.jar app.jar

# Expose the port that the app runs on
EXPOSE 8080

# Run the JAR file
CMD ["java", "-jar", "app.jar"]