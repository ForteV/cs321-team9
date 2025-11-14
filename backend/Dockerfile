# ------------------------------
# 1) Build stage
# ------------------------------
FROM maven:3.9.6-eclipse-temurin-17 AS builder

WORKDIR /app

# Copy Maven config and source
COPY pom.xml .
COPY src ./src

# Build the project (creates target/*.jar)
RUN mvn -e -X -DskipTests package

# ------------------------------
# 2) Runtime stage
# ------------------------------
FROM eclipse-temurin:17-jre

WORKDIR /app

# Copy built JAR from builder stage
COPY --from=builder /app/target/*.jar /app/app.jar

# Expose Railway port
EXPOSE 8080

# Railway sets PORT environment variable, so pass it to your server if needed
ENV PORT=8080

# Run your embedded Jetty server
CMD ["java", "-jar", "/app/app.jar"]
