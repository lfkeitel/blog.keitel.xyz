---
title: "Packet Guardian Release 1.3.0"
author: "Lee Keitel"
description: "Release notes for Packet Guardian v1.3.0"
date: 2018-03-30T08:47:12-05:00

type: "post"
categories: ["packet-guardian", "release"]
---

**GitHub**: https://github.com/packet-guardian/packet-guardian

Version 1.3.0 is a bug and security fix release. It's highly recommended that all instances of Packet Guardian be updated
to 1.3.0.

This version contains a database migration to allow user permissions to be manageable from the web interface.
This migration will take place automatically when the program starts. As always, **make a backup** of the database
before any upgrade.

## Changelog

### Fixes

* Permissions on blacklisted users [918adf2](https://github.com/packet-guardian/packet-guardian/commit/918adf21820c286ff50ffff43c152e5b3180467a)
* Old sessions cleanup task [ee1435a](https://github.com/packet-guardian/packet-guardian/commit/ee1435ad2c055b3bfcb97db5553b3c8a60645150)
* Issues with stale database connections [ac2f5c9](https://github.com/packet-guardian/packet-guardian/commit/ac2f5c984a260bccc9cbf35f60288536cd2beaff)
* JSON encoding of Device object [dc769fb](https://github.com/packet-guardian/packet-guardian/commit/dc769fb7a332fdde5f73331e0cc88697b90fd9fe)
* Permissions on GET device api [525b6fd](https://github.com/packet-guardian/packet-guardian/commit/525b6fdeb17cab2a3068ccbaa88b9de06c23ad8f)
* Error when blacklisting a blacklisted device [fc6de6f](https://github.com/packet-guardian/packet-guardian/commit/fc6de6fbda740f3b519ce9cdea1f0a1b93c74930)
* GET device api consistency [cff340e](https://github.com/packet-guardian/packet-guardian/commit/cff340e4745bdd5b1ad5759a2fdb34b651aca5db)
* Couple formatting issues on smaller screens [b2644d7](https://github.com/packet-guardian/packet-guardian/commit/b2644d7d03fcf8354db95f9d0df378517ba2e51e), [2506717](https://github.com/packet-guardian/packet-guardian/commit/2506717fd0967dea28dbebd29e608222c17e0404)

### New

* Status api `/api/status` [c09027b](https://github.com/packet-guardian/packet-guardian/commit/c09027b562147be93d3b4a4e770a44858b79be21)
* Manage user permissions through web interface [bee5d98](https://github.com/packet-guardian/packet-guardian/commit/bee5d983e13515343923e2f4ba08a96624dc3e3a)
* GET user api `/api/user/{username}` [1426f6b](https://github.com/packet-guardian/packet-guardian/commit/1426f6b0ecc72f6502bcf9a7277891d7ede54f6f)
