# [☀︎SOLVA](https://solva.vercel.app/) - A project management dashboard for SolarNova Project (Solar Photovoltaic (PV) System Installation)
## Preface
I was inspired to develop this project management dashboard from my time as a project engineer on [SolarNova](https://www.hdb.gov.sg/about-us/our-role/smart-and-sustainable-living/solarnova-page) the project. This dashboard is designed for projects with multiple small project sites, and based on the use case for the SolarNova project. It is able to track the different milestones dates, show overall completion graph, upload/download documents and for the Project Managers, able to know which project sites to prioritise at a glance.
</br>
#### Brief description of project:
Each project site is a HDB block, represented by a postal code.
</br>
Project lifecycle: 
Pending (not started yet) > Under construction > Ready for testing and commissioning > System turn on (project completion)

#### [View dashboard here](https://solva.vercel.app/)

## How to use
There are 3 different user roles and views for the dashboard – Admin, Project Manager and Auditor. The user matrix will be as follows: <br/>

![Alt Text](https://github.com/shinyi-a/readmeStorage/blob/main/solva/allusermatrix.jpg)

#### Logging in as Admin
![Alt Text](https://github.com/shinyi-a/readmeStorage/blob/main/solva/admin.jpg)
- Admin can only view the dashboard as they are not in charge of the project.
- Admin can add a Project Manager user or an Auditor user.
- Admin can delete users.

#### Logging in as Project Manager
![Alt Text](https://github.com/shinyi-a/readmeStorage/blob/main/solva/projectmanager.jpg)
- Project Managers are able to perform all the functions on the dashboard except for deleting other Project Manager type users.
- Project Managers are able to create blocks, update blocks and delete Auditor type users.

#### Logging in as Auditor
![Alt Text](https://github.com/shinyi-a/readmeStorage/blob/main/solva/auditor.jpg)
- Auditor checks the testing and commissioning test reports as well as the as-built drawings of the turned on solar PV sites.
- Auditor will only be able to view the list of turned on blocks.
- Auditor is only able to download the test reports and as-built drawings.

## Features
![Alt Text](https://github.com/shinyi-a/readmeStorage/blob/main/solva/login.jpg)
![Alt Text](https://github.com/shinyi-a/readmeStorage/blob/main/solva/graph.jpg)
![Alt Text](https://github.com/shinyi-a/readmeStorage/blob/main/solva/blocks.jpg)
![Alt Text](https://github.com/shinyi-a/readmeStorage/blob/main/solva/turnon.jpg)
![Alt Text](https://github.com/shinyi-a/readmeStorage/blob/main/solva/cardview.jpg)
![Alt Text](https://github.com/shinyi-a/readmeStorage/blob/main/solva/update.jpg)
![Alt Text](https://github.com/shinyi-a/readmeStorage/blob/main/solva/usermanagement.jpg)

## Technologies used

- Next.js
- MongoDB
- CSS
- axios
- Chart.js
- IPFS
- OneMap API
