# Raidio

This is a Discord Bot that allows users to report raids

### Commands
`!raid [tier] [hatchTime] [location]`: Allows a user to report Raid that has not hatched yet.
* `tier`: A number 1 to 5. Can include Asterisk.
  * **Examples**: `1`, `5`, `2*`, `4*`
* `hatchTime`: Time within 60 minutes. Must include `a` or `p`.
  * **Examples**: `1:00a`, `6:45p`, `10:10am`, `3:38pm`
* `location`: Any gym name
  * **Examples**: `territorial`, `VFW`, `Blaine baseball Complex`, `door Covenant`
  
`!raid [pokemon] [endTime] [location]`: Allows a user to report Raid that has hatched.
* `tier`: Any current raid boss Pokemon name 
  * **Examples**: `pikachu`, `Tyranitar`, `lotad`, `Empoleon`
* `hatchTime`: Time within 45 minutes. Must include `a` or `p`. 
  * **Examples**: `1:00a`, `6:45p`, `10:10am`, `3:38pm`
* `location`: Any gym name
  * **Examples**: `territorial`, `VFW`, `Blaine baseball Complex`, `door Covenant`
