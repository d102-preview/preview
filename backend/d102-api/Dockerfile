FROM openjdk:21

EXPOSE 8081

WORKDIR /app

VOLUME /logs
VOLUME /files

ADD ./build/libs/*.jar /app.jar

ENTRYPOINT ["java", "-Dspring.profiles.active=${SPRING_PROFILES_ACTIVE}", "-jar", "/app.jar"]
