FROM openjdk:17
EXPOSE 8080
ADD target/UserMS-0.0.1-SNAPSHOT.jar UserService.jar
ENTRYPOINT ["java","-jar","UserService.jar"]