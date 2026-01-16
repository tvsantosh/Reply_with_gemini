# ---------- Build stage ----------
FROM eclipse-temurin:21-jdk-jammy AS builder

WORKDIR /app

# Copy Maven files
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

# Download dependencies (cached)
RUN ./mvnw dependency:go-offline

# Copy source code
COPY src src

# Build the jar
RUN ./mvnw package -DskipTests


# ---------- Runtime stage ----------
FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

COPY --from=builder /app/target/email-writer-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
