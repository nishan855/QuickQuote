# QuickQuote
## Table of Content
1.	Overview
2.	User Stories
3.	Built with
4.	Prerequisites
5.	Installation
6.	Future Work
7.	Authors
8.	License
9.	Acknowledgement
## Overview
### Description
The quick quote application is a web-based full-stack application that provides an instant quoting service to 2D cutting shops.
### User Stories
#### Users are categorized into Buyer and Seller
* Buyers can drag and drop the DXF files in the buyer home page.
* Buyers can select the material name, quantity, cutting process, and thickness.
* Buyers can view the instant quotes based on the DXF files.
* Buyers can place the order.
* Buyers can provide their payment information.
* Sellers can create an account, login and logout.
* Seller can add their information like company name and motto.
* Sellers can add the material and process their shop offers.
* Seller can view the material setup.
* Seller can view the order placed by buyer.
* Seller can download the DXF file uploaded by buyer.
* Seller can view the buyer information.

### Built with
* Figma: Design tool with real-time collaboration.
* ReactJs: JavaScript library for building user interfaces.
* SpringBoot: Java framework for application development. 
* Kabeja: Java libraby for DXF file parsing (Jar file attached with code). 
* Amazon DynamoDB and S3: Cloud service platform for database and file storage. 

 
## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
## Prerequisites
Things that needs to be installed.
* Intellij Ultimate(2019 or latest)
* Java SE JDK 16
* Node.js 14.17.5(or latest)
#### Dependencies are shown below:
![dependencies](https://user-images.githubusercontent.com/58004262/129462293-e27493fa-d01f-4602-88a5-edf0d3f21af6.PNG)
## Installation
### Front-end 
1.	Clone the repo
	 ##### git clone  https://github.com/nishan855/QuickQuote
2. 	Navigate to the directory “quickquote”. 
        ##### Directory tree:   Quickquote -> quickquote   
3.	Install npm package
	 ##### npm install
4.	Other necessary installation are:
	* npm install react-uuid
        * npm install @aws-amplify/auth
	* npm install @material-ui/core
	* npm install @material-ui/icons
      	* npm install @paypal/react-paypal-js
	* npm install @testing-library/jest-dom
	* npm install @testing-library/react
	* npm install @testing-library/user-event
	* npm install aws-sdk
	* npm install react-bootstrap
	* npm install react-router-dom
	* npm install styled-components
	* npm install react-scripts
	* npm install react-toastify 
5. 	Set up your aws(Refer to AWS server Settings file) and do following steps. 
	Start application (npm start) to see the app withour connection to aws server.  
	!! ! Remember You are not connected to aws server at this moment!!! 

6.	Generate your own aws-exports.js and S3config.js and replace the current files with yours. 
	Detailed step of these is in AWS server Settings file 
7.	In DynamoConfig.js file, replace the access key and secret key with your own AWS keys.  
	 Detailed step of these is in AWS server Settings file. 
8.	 Start the React application. This will open the app on your localhost: 3000 
	##### npm start 
	
###	Back-end (Spring Boot Part) 
1. 	Clone the repo 
	##### git clone  https://github.com/nishan855/QuickQuote
2.	Navigate to the directory “springPractice”. 
	Directory tree:   Quickquote ->   springPractice 
3. 	Open springPractice on the IDE 
	For IntelliJ, go to File -> open, selcet  springPractice folder. 
4. 	Setup your JDK. For this project, we have used openjdk 16. 
        To set a JDK for this project (on Intellij), go to File -> Project Structure -> Project, select your JDK under Project SDK.    
 5. 	Add Kabeja.jar as one of your libraries.  Kabeja-0.4 jar file is attached with this project  source code 
           For this (on intelliJ), go to File -> Project Structure ->Libraries, add kabeja as a library  
 6. 	Configure your AWS DynamoDB with Spring boot. For this, Provide your AWS access   and secret key on DynamoDBConfig.java file as done before. 
7.  	Run the application as “Spring Boot application”.  
	You will get “Spring boot application started” message on terminal. Although this server use local host:8080 normally, there is no UI for this 	(Just an API).  
	 Test it while placing order on buyer side with DXF files. 
8. 	All the dependencies are in Pom.xml file. Dependencies includes: 
	 aws-java-sdk-bom 1.11.1000 
       	 aws-java-sdk-dynamodb 

       ##### spring-boot-starter-web lombok 1.18.20 
       ##### spring-boot-starter-test 
       ##### reactor-test 
       
###	Aws Server Settings (AWS Part) 
	For this, refer to the document, AWS_Server_Settings, which is submitted with the documentation.
	
##	Future Work 
 #### All the future work will be done with close consultation with the sponsor Robert Gullette. As per Sponsor, most of the functional work is already completed. 
#### Some of the things to work on in future include: 

1.	Better area calculation algorithm or library for all DXF shapes (Springboot). 

2.	Better Interface for editing material available or making changes to the previously available material (Shop side). 

3.	Some UI changes, modern nice UIs. 

Others, as requested by sponsor. 	


## Authors
* Keng, Eric  
* Kunwar, Alisha 
* Laith, Marzouq
* Parajuli, Sindhu
* Thapa, Nishan

## License
This project is distributed under the MIT License.

## Acknowledgement
This is CSE-Senior Design Project , CSE 4316 and CSE 4317, under Professor Shawn Geiser, Christopher McMurrough and Sponsor Robert Gullete.











