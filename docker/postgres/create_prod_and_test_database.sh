# create two prod and test database

if [[ -n "$POSTGRES_DB1" && -n "$POSTGRES_DB2" && -n "$POSTGRES_USER" ]]
then
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
	    CREATE USER $POSTGRES_DB1;
	    CREATE USER $POSTGRES_DB2;
	    CREATE DATABASE $POSTGRES_DB1;
	    CREATE DATABASE $POSTGRES_DB2;
	    GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB1 TO $POSTGRES_DB1;
	    GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB2 TO $POSTGRES_DB2;
EOSQL
    echo Databases $POSTGRES_DB1 and $POSTGRES_DB2 created successfully
fi

