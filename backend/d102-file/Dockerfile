FROM openjdk:21

EXPOSE 8082

WORKDIR /app

VOLUME /logs
VOLUME /files

ADD ./build/libs/*.jar /app.jar

ENTRYPOINT ["java", "-Dspring.profiles.active=${SECRETS_FILE}", "-jar", "/app.jar"]
