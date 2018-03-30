---
title: "Packet Guardian"
description: "Network captive portal"
author: "Lee Keitel"
date: 2018-03-30T08:47:12-05:00

linktitle: "Github"
link: "https://github.com/packet-guardian/packet-guardian"

type: "itemized"
socialShare: false
---

## Packet Guardian

[Documentation](https://github.com/packet-guardian/packet-guardian/blob/master/docs/README.md)

**Current Release**: [v1.3.0](https://github.com/packet-guardian/packet-guardian/tree/v1.3.0)

Packet Guardian is a network captive portal used to make users register a device before being granted network
access. The application uses Nginx, Bind, DHCP, and a web interface to redirect client devices to a registration
page where they can either enter a username and password, phone number for guest access, or simply click through
a use policy agreement.

Users can manage their registered devices to remove devices no longer in use or manually register devices that
don't have web browsers or don't support captive portals.
