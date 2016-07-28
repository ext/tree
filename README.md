Running
-------

nginx example config:

    location /tree {
        try_files $uri /tree/index.php/$uri$is_args$args;
    }

    location /tree/static/ {
        try_files $uri =404;
        alias /path/to/tree/public/static/;
    }

    location /tree/index.php {
        alias /path/to/tree/public/index.php;
        include snippets/fastcgi-php.conf;
        include fastcgi_params;
        fastcgi_pass unix:/var/run/php5-fpm.sock;
    }
