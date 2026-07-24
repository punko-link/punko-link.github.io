---
title: Cheat Sheet
description: The commands and config blocks you'll reach for most, in one place.
next: alternatives.md
nextTitle: Alternatives
---

Everything here is covered in more depth elsewhere in the docs — this page is just for when you already know what you want and don't want to click through five pages to get it.

## on_startup.yml - local configuration

```yml
config_mode: Local
config_source: config.yml
```

## on_startup.yml - configure by network

```yml
config_mode: Network
config_source: https://exemple.com/path_to_config_file.yml
```

## config.yml - default state (create on startup)
The fastest way to create empty config. Remove `config.yml` and restart l7 or:

```yml
setup_done: false                      # a flag indicating whether the installer has finished running
admin_panel_enables: true              # a flag indicating is the admin panel enabled
admin_path: /admin                     # base bath of admin web-interface
admin_role: admin                      # role which will be using for administrating l7
cert_path: './tls/cert.pem'            # path to tls certificate
key_path: './tls/key.pem'              # path to tls key
max_auth_token_age_in_seconds: 1000    # max authorize token age (seconds)
admin_password_hash:                   # admin password hash
primary_router: default_router         # primary router name
routers:                               # routers
  default_router:                      # router root
    roles:                             # router roles
      - admin                          # router role
    routes:                            # router routes
      GET/admin/api/*:                 # route root
        key: GET/admin/api/*           # route key "{method}{path}"
        method: GET                    # route method
        path: /admin/api/*             # route path
        route_type: DynamicController  # route type
        auth_required: true            # a flag indicating is authentification required for this route
        policy:                        # list of roles which have access to the route
          - admin                      # role
      PUT/admin/api/*:
        key: PUT/admin/api/*
        method: PUT
        path: /admin/api/*
        route_type: DynamicController
        auth_required: true
        policy:
          - admin
      DELETE/admin/api/*:
        key: DELETE/admin/api/*
        method: DELETE
        path: /admin/api/*
        route_type: DynamicController
        auth_required: true
        policy:
          - admin
      GET/admin:
        key: GET/admin
        method: GET
        path: /admin
        route_type: DynamicController
        auth_required: false
        policy: []
      POST/admin/api/auth/login:
        key: POST/admin/api/auth/login
        method: POST
        path: /admin/api/auth/login
        route_type: AuthorizeController
        auth_required: false
        policy: []
      POST/admin/api/*:
        key: POST/admin/api/*
        method: POST
        path: /admin/api/*
        route_type: DynamicController
        auth_required: true
        policy:
          - admin
    pools:                             # list of pools
    servers:                           # list of servers
```

## Still stuck?

[Contact Sales](index.html#contact) reaches an engineer directly.
