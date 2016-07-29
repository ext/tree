Tree
====

NördtroXy 48h-ish gamedev entry

Running
-------

nginx example config:

    server {
        listen 80;
        listen [::]:80;
        server_name tree;
    
        root /path/to/tree/public;
    
        location / {
            try_files $uri /index.php/$uri$is_args$args;
            rewrite ^/info/(.*) /info.php/$1 last;
        }
    
        location /static/ {
            try_files $uri =404;
            expires off;
            sendfile off;
        }
    
        location ~ /(index|info).php {
            include snippets/fastcgi-php.conf;
            include fastcgi_params;
            fastcgi_pass unix:/var/run/php5-fpm.sock;
        }
    }
