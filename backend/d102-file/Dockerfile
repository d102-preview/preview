FROM openjdk:21

EXPOSE 8082

# WORKDIR /app

# VOLUME /logs
# VOLUME /files

ADD ./build/libs/*.jar /app/app.jar

ENTRYPOINT ["java", "-Dspring.profiles.active=${SPRING_PROFILES_ACTIVE}", "-jar", "/app/app.jar"]
