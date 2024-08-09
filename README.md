**`Setup`**

**Frontend** 
Switch to angular-app and run `yarn OR npm install` and after that run `yarn start`.

**Backend** 
Switch to dotnet app and make sure you have postgresql installed. In that *Create a database* `mydatabase` and also *Create tables*

```
CREATE TABLE IF NOT EXISTS public."Contacts"
(
    id integer NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    "phoneNumber" text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Contacts_pkey" PRIMARY KEY (id)
)
```
```
CREATE TABLE IF NOT EXISTS public."Users"
(
    username text COLLATE pg_catalog."default" NOT NULL,
    id integer NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)
```
and after that insert one user for login in db and than run `dotnet run` to run the project.
