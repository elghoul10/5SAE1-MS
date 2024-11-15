FROM openjdk:17
EXPOSE 8084
ADD target/UserMS-0.0.1-SNAPSHOT.jar user.jar
ENTRYPOINT ["java", "-jar", "user.jar"]