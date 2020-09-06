# Gatsby Starter Site

## Brief

This is a gatsby site built using [GatsbyJS](https://www.gatsbyjs.com/). All data is sourced through wordpress and the site includes a starter setup for posts and live preview. It's currently running the `v4` [beta](https://github.com/gatsbyjs/gatsby-source-wordpress-experimental/blob/master/docs/getting-started.md) of this plugin.

## Wordpress setup

The wordpress instance for this site requires the following plugins:

- [wp-gatsby](https://github.com/gatsbyjs/wp-gatsby)
- [wp-graphql](https://github.com/wp-graphql/wp-graphql)
- [wp-graphql-acf](https://github.com/wp-graphql/wp-graphql-acf)
- [wp-graphql-custom-post-type-ui](https://github.com/wp-graphql/wp-graphql-custom-post-type-ui)
- [permalinks customizer](https://wordpress.org/plugins/permalinks-customizer/)

## Setting up Live Preview

The frontend is configured to work with the wordpress "Preview Changes" button on any post type.

Currently investigating if the following steps are necessary when the gatsby site is on the same domain as the WP site. (as in, wp is on a subdomain and gatsby at root)

1. make sure you're using my "Gatsby-Headless-Wordpress" theme and the `permalinks customizer` plugin

2. and edit the following line:

```php
// inside functions.php

define("PREVIEW_DOMAIN", "http://localhost:8000"); // change this to the gatsby site's url
```

3. Make sure the post has a custom route setup in permalinks customizer like so: `<the path>/%title%` (with the % included) like: `blog/%title%`.

## Environment Variables

If downloading this repo for the first time, you'll need to create a hidden files for development variables. All environmental variables for production can be set within the Netlify instance.

Create:

- `.env.development`

You can copy and paste the `.example.env` file as a template for the variables you'll need.
