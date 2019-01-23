# BBS Os2display administrator interface

## Development
See https://github.com/rvk-utd/os2display-infrastructure for how to set up a development environment.

## Bundles
Documentation for the [rvk-custom-os2display](src/rvk-custom-os2display/README.md) bundle.

# Helpful commands
We have defined a couple of commands for os2display.

To push content
<pre>
php app/console ik:push
</pre>

To reindex search
<pre>
php app/console ik:reindex
</pre>
This does not include delete of records that are removed from symfony but not search.

To clear cache
<pre>
php app/console cache:clear
</pre>

To brute force clear cache
<pre>
rm -rf app/cache/*
</pre>


# API tests

Clear out the acceptance test cache and set up the database:

```
app/console --env=acceptance cache:clear
app/console --env=acceptance doctrine:database:create
```

Run API tests:

```
./vendor/behat/behat/bin/behat --suite=api_features
```

Run only tests with a specific tag:

```
./vendor/behat/behat/bin/behat --suite=api_features --tags=group
```
