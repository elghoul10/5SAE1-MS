FROM openjdk:17
EXPOSE 8090
ADD target/MsApiGateway-0.0.1-SNAPSHOT.jar UserServiceGetway.jar
ENTRYPOINT ["java","-jar","UserServiceGetway.jar"]