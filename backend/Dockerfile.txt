# Use official Maven image to build the app
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

# Copy Maven project files
COPY pom.xml .
COPY src ./src

# Build the project (produces target/*.jar)
RUN mvn -q -e -DskipTests package

# Use lightweight runtime image
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy the built jar from previous stage
COPY --from=build /app/target/*.jar app.jar

# Railway sets PORT automatically. Jetty binds to 8080, so we don't EXPOSE.
ENV PORT=8080

# Run Jetty server inside your jar
CMD ["java", "-jar", "app.jar"]
