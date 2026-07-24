---
title: Quickstart
description: Get a Punkolink instance routing real traffic in under five minutes.
next: first-login.md
nextTitle: First Login
---

This walks through running Punkolink locally and routing your first request. It assumes you already have a binary or container image — if not, start with the Overview page.

## 1. After extracting the archive, you will find yourself with the following file structure.

```
l7/
├── l7
├── config.yml       # main application config
├── on_startup.yml   # start config
├── README.md
├── CHANGELOG.md
└── LICENCE
```

## 2. TLS
If you already have tls key and certificate for the node place them in such a way as to obtain the following project structure.

```
l7/
├── l7
├── config.yml
├── on_startup.yml
├── README.md
├── CHANGELOG.md
├── LICENCE
└── tls
    ├── cert.pem     # Make sure your file is named the same way as in the example.
    └── key.pem      # Make sure your file is named the same way as in the example.
```

If you do not have a TLS key and certificate, simply proceed to the next step.

## 3. Place the license key file in the application root.
After gaining access to the demo or purchasing your chosen plan, you will receive a "KEY" license key file. If you do not have this key, please contact support.

## 4. First run
Ensure that no other application is using port 443. Also, if you haven't yet specified your TLS key and certificate, port 80 must be free for Let's Encrypt to work correctly.
```bash
$ sudo chmod +x ./l7
$ sudo ./l7
```

If this is the first launch, you will need to fill out a brief setup questionnaire. Follow the instructions in the terminal.

## 5. Installed

If everything goes smoothly, a `config.yml` file will appear in the project directory. It is not intended for manual editing; do so only as a last resort.

By default, the admin panel's graphical interface will be available at `https://{your_ip_or_domain}/admin`.
The default password is `changeme`.


## Next steps

- Secure the admin panel in [First Login](#first-login)
- Add your first route in [New Route](#new-route)