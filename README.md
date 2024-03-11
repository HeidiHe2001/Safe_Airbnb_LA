# 550 Database Final Project - CrimeSearchLA

## **Application/Website Idea**

We want to create a searchable crime database platform named "CrimeSearchLA". This platform primarily serves as a robust search engine for crime records, enabling users, researchers, law enforcement, and journalists to access and analyze detailed crime data. The primary aim is to offer detailed insights into crime patterns, assist in academic and professional research, and improve public awareness.

## **A 1-2 sentence description of the dataset**

The dataset consists of detailed crime records for Los Angeles from 2020 onwards, with fields including dates, times, locations described to the nearest hundred block, types of crimes, weapon used, victim demographics, and status of cases. Each incident is identified by a unique record number (DR_NO), with additional information about the crime's circumstances and the involved parties. 

## **A link to where you found the dataset**
https://catalog.data.gov/dataset/crime-data-from-2020-to-present

**i. relevant size statistics**
Number of rows: 901,357
Number of columns (attributes): 21
Size: 235.5 mb
**ii. summary statistics of several attributes (e.g. report mean, standard deviation)**
The only attribute with meaningful mean and standard deviation:
Attribute: Vict Age, Mean: 29.6, Standard Deviation: 21.8 
	Other categorical variables with number of unique values, top value and count:
Attribute: Date Rptd, Unique: 1511, Top: “02/03/2023 12:00:00 AM”, Top Count: 925
Attribute: DATE OCC, Unique: 1511, Top: “12/02/2022 12:00:00 AM”, Top Count: 1132
Attribute: AREA NAME, Unique: 21, Top: “Central”, Top Count: 61416
Attribute: Crm Cd Desc, Unique: 139, Top: “VEHICLE - STOLEN”, Top Count: 96751
Attribute: Status, Unique: 6, Top: “IC”, Top Count: 721221
Attribute: LOCATION, Unique: 65040, Top: “800 N ALAMEDA ST”, Top Count: 1717
