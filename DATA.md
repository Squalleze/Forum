forums -> sections
section -> topics
topic -> topic


POST /api/register - { string: username, string: password } | { int: error, string: token? }
POST /api/signin - { string: username, string: password } | { int: error, ... }
DELETE /api/signout - { string: token } | { int: error }
<!-- checks if token has not expired -->
GET /api/check - { string: token } | { int: error }
GET /api/users/@me - { string: token } | { int: error, ... }