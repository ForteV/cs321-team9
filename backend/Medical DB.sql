CREATE TABLE Users(
    fname VARCHAR2(30),
    lname VARCHAR2(30),
    userid VARCHAR2(11),
    dob DATE,
    marital_status VARCHAR2(10),
    ethnicity VARCHAR2(10),
    sex VARCHAR2(1),
    wei NUMBER(3, 0),
    height NUMBER(3, 0),
    PRIMARY KEY (userid)
);
CREATE TABLE Login(
    username VARCHAR2(30),
    passwd VARCHAR2(30),
    userid VARCHAR2(11),
    PRIMARY KEY (username),
    FOREIGN KEY (userid) REFERENCES Users
);
CREATE TABLE Addresses(
    bldg# NUMBER,
    street VARCHAR2(20),
    city VARCHAR2(20),
    state VARCHAR2(20),
    zip NUMBER(5, 0),
    ssn VARCHAR2(11),
    userid VARCHAR2(11),
    PRIMARY KEY (ssn,bldg#, street, city, state, zip),
    FOREIGN KEY (userid) REFERENCES Users
);
CREATE TABLE LabResults(
    lResultID VARCHAR2(20),
    bloodtype VARCHAR2(20),
    CBC NUMBER(5, 2),
    BMP NUMBER(5, 2),
    LDL NUMBER(5, 2),
    blood_sugar NUMBER(5, 2),
    vitamin_D NUMBER(5, 2),
    userid VARCHAR2(11),
    PRIMARY KEY (lResultID),
    FOREIGN KEY (userid) REFERENCES Users
);
CREATE TABLE Calendar(
    cID VARCHAR2(20),
    doctor_name VARCHAR2(20),
    loc VARCHAR2(20),
    cdate DATE,
    description VARCHAR2(50),
    userid VARCHAR2(11),
    PRIMARY KEY (cID),
    FOREIGN KEY (userid) REFERENCES Users
);
CREATE TABLE Allergies(
    aID VARCHAR2(20),
    allergy_type VARCHAR2(20),
    allergy_name VARCHAR2(20),
    severity VARCHAR2(50),
    PRIMARY KEY (aID),
    FOREIGN KEY (userid) REFERENCES Users
);
CREATE TABLE Pharmecy(
    pharmecyID VARCHAR2(20),
    pharmecyName VARCHAR2(20),
    pharmecyAddreess VARCHAR2(30),
    PRIMARY KEY (pharmecyID)
);
CREATE TABLE Medications(
    mID VARCHAR2(20),
    mName VARCHAR2(20),
    mDosage NUMBER(2, 2),
    mUnit VARCHAR2(20),
    prescriber VARCHAR2(20),
    bDate DATE,
    eDate DATE,
    pharmecyID VARCHAR2(20),
    alchohol BOOLEAN,
    nicotine BOOLEAN,
    PRIMARY KEY (aID),
    FOREIGN KEY (userid) REFERENCES Users
    FOREIGN KEY (pharmecyID) REFERENCES Pharmecy
);
CREATE TABLE Insurance(
    insuranceName VARCHAR2(20),
    insuranceCard VARCHAR2(20),
    insuranceID VARCHAR2(50),
    groupdID VARCHAR2(20),
    userid VARCHAR2(11),
    PRIMARY KEY (insuranceID),
    FOREIGN KEY (userid) REFERENCES Users
);
CREATE TABLE MedicalConditions(
    mcID VARCHAR2(20),
    conditionName VARCHAR2(20),
    conditionDescription VARCHAR2(300),
    conditionDate DATE,
    userid VARCHAR2(11),
    PRIMARY KEY (mcID),
    FOREIGN KEY (userid) REFERENCES Users
);
CREATE TABLE Surgeries(
    surgeryID VARCHAR2(20),
    surgeryName VARCHAR2(20),
    surgeryDescription VARCHAR2(300),
    surgeryDate DATE,
    userid VARCHAR2(11),
    PRIMARY KEY (surgeryID),
    FOREIGN KEY (userid) REFERENCES Users
);
CREATE TABLE Vaccines(
    vID VARCHAR2(20),
    vaccineName VARCHAR2(20),
    receivedDate DATE,
    renewalDate DATE,
    userid VARCHAR2(11),
    PRIMARY KEY (vID),
    FOREIGN KEY (userid) REFERENCES Users
);
CREATE TABLE FamilyHistory(
    familyID VARCHAR2(20),
    familyHistoryName VARCHAR2(20),
    fDescription VARCHAR2(500),
    userid VARCHAR2(11),
    PRIMARY KEY (familyID),
    FOREIGN KEY (userid) REFERENCES Users
);