FROM openjdk:17
EXPOSE 8888
ADD target/configServer-0.0.1-SNAPSHOT.jar configServer.jar
ENTRYPOINT ["java","-jar","configserver.jar"]