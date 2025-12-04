# Giai đoạn 1: Build ứng dụng
# Sử dụng image hỗ trợ Java mới nhất (hoặc version tương thích)
FROM gradle:8.5-jdk21 AS build
WORKDIR /app

# Copy các file cấu hình Gradle trước để tận dụng cache
COPY build.gradle settings.gradle gradlew ./
COPY gradle ./gradle

# Copy source code
COPY src ./src

# Lưu ý: Vì bạn set Java 24 trong build.gradle, nếu image gradle mặc định chưa hỗ trợ,
# bạn có thể cần sửa build.gradle về Java 21 để dễ deploy hơn.
# Dưới đây là lệnh build bỏ qua test để tiết kiệm thời gian deploy
RUN gradle build -x test --no-daemon

# Giai đoạn 2: Chạy ứng dụng
FROM openjdk:21-slim
WORKDIR /app

# Copy file jar đã build từ giai đoạn 1
COPY --from=build /app/build/libs/*.jar app.jar

# Render thường cung cấp biến môi trường PORT, nhưng Spring Boot mặc định chạy 8080
# Ta sẽ cấu hình biến môi trường để Spring Boot nhận port từ Render hoặc fallback về 8080
ENV SERVER_PORT=8080

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]