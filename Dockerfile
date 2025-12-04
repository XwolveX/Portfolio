# Giai đoạn 1: Build ứng dụng
FROM gradle:8.5-jdk21 AS build
WORKDIR /app

# Copy các file cấu hình
COPY build.gradle settings.gradle gradlew ./
COPY gradle ./gradle

# Copy source code
COPY src ./src

# Build ứng dụng
RUN gradle build -x test --no-daemon

# Giai đoạn 2: Chạy ứng dụng
# --- SỬA DÒNG NÀY ---
# Thay vì openjdk:21-slim (không tồn tại), dùng eclipse-temurin:21-jre
FROM eclipse-temurin:21-jre
# --------------------

WORKDIR /app

# Copy file jar từ giai đoạn build
COPY --from=build /app/build/libs/*.jar app.jar

# Cấu hình port
ENV SERVER_PORT=8080
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]