# 550 Database Final Project - AirbnbSafety-LA

### **Application/Website Idea**
Our tool provides a convenient way to view Airbnb listings alongside nearby crime rate data. By integrating Airbnb's listing information with crime data from reliable sources, users can make more informed decisions when choosing accommodations.

Key Features:

- View Airbnb listings with detailed descriptions and ratings.
- Explore an interactive map displaying the locations of Airbnb listings and nearby crime incidents.
- Access crime rate statistics, including types of crimes reported and their frequency in the vicinity of each listing.
- Customize search filters to narrow down listings based on preferred crime rate levels.
With our tool, users can easily assess the safety of an area before booking an Airbnb stay, empowering them to prioritize their peace of mind and security while travelling.

### **A link to where you found the dataset**
## 1. https://catalog.data.gov/dataset/crime-data-from-2020-to-present

The dataset consists of detailed crime records for Los Angeles from 2020 onwards, with fields including dates, times, locations described to the nearest hundred block, types of crimes, weapon used, victim demographics, and status of cases. Each incident is identified by a unique record number (DR_NO), with additional information about the crime's circumstances and the involved parties.

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

## 2. https://data.insideairbnb.com/united-states/ca/los-angeles/2023-12-03/data/listings.csv

This dataset provides valuable insights into Airbnb listings in Los Angeles, including details about hosts, neighborhoods, pricing, availability, and review metrics. 

**i. relevant size statistics**
Number of rows: 45,596

Number of columns (attributes): 18

Size: 9.1 mb

**ii. summary statistics of several attributes (e.g. report mean, standard deviation)**

Attribute: calculated_host_listings_count, Mean: 22.51, Standard Deviation: 82.55

Attribute: review_scores_communication, Mean: 4.84, Standard Deviation: 0.43

Attribute: review_scores_value, Mean: 4.68, Standard Deviation: 0.51

Attribute: calculated_host_listings_count_private_rooms, Mean: 1.96, Standard Deviation: 7.78

Attribute: calculated_host_listings_count_shared_rooms, Mean: 0.21, Standard Deviation: 2.19

Attribute: reviews_per_month, Mean: 1.44, Standard Deviation: 1.70









