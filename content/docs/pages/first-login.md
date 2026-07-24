---
title: First Login
description: In this section, we will cover the first steps of L7 management via the admin panel.
next: new-route.md
nextTitle: New Route
---

Open the admin panel at `https://{your_domain_or_ip:port}` and log in using the default password `changeme`.

You will see an interface that can be roughly divided into five sections: the header, the right-hand general settings panel, the left-hand navigation panel, and the control area.

When logging into the admin panel for the first time, it is important to ensure the security of the site. Before examining the management controls in greater detail, perform this initial configuration.

## 1. Update Password

Locate the "Settings" field in the header and click on it. The right-hand general settings panel will open.

In the Account section, enter your current password and new password, then click `Change password`.

## 2. Add ip filter

In the left-hand navigation panel, select the `Routes` section.

You can see 6 service routes:
```
GET:/admin                   # Returns admin static
POST:/admin/api/auth/login   # Login endpoint
GET:/admin/api/*             # Admin panel get routes
POST:/admin/api/*            # Admin panel post routes
PUT:/admin/api/*             # Admin panel put routes
DELETE:/admin/api/*          # Admin panel delete routes
```

In the IP whitelist column, list the IP addresses that will have access to the admin panel, separated by commas.

Leave the IP blacklist blank.

Next, click Apply in the header.

## Next

In next section [New Route](#new-route) walks through adding your first route from the admin panel.
