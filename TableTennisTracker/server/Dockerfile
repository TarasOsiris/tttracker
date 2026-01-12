# Multi-stage Dockerfile for Ktor server
# Build from project root: docker build -f server/Dockerfile -t tttracker-server .

# Stage 1: Build the fat JAR
FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

# Copy Gradle wrapper and build files first (for layer caching)
COPY gradlew .
COPY gradle gradle
COPY build.gradle.kts .
COPY settings.gradle.kts .
COPY gradle.properties .

# Copy module build files
COPY server/build.gradle.kts server/
COPY shared/build.gradle.kts shared/
COPY data/build.gradle.kts data/

# Make gradlew executable
RUN chmod +x gradlew

# Download dependencies (cached layer)
RUN --mount=type=cache,target=/root/.gradle \
    ./gradlew --no-daemon dependencies

# Copy source code
COPY shared/src shared/src
COPY data/src data/src
COPY server/src server/src

# Build the fat JAR
RUN --mount=type=cache,target=/root/.gradle \
    ./gradlew :server:buildFatJar --no-daemon

# Stage 2: Run the application
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy the fat JAR from build stage
COPY --from=build /app/server/build/libs/server-all.jar server.jar

# Expose the server port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "/app/server.jar"]
