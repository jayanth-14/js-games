## Thoughts on Traffic game
- There will be four roads. vehicles will ge generated randomly.
- New vehicles will be stacked untill the end.
- The users task is to choose a way where traffic will be opened.
- The vehicles will move on to their path, reducing vehicles on that road.
- If there are too many vehicles on the road reaching the end, the user will lose.

## Brainstroming
- What is the maximum number of vehicles on each road? - `currently 2`
- Will they have only green and red light or there is also orange light? - `Only red and green`
- How many players will be playing? - `1`
- What will be using to represent vehicles? emojis or empty spaces with different backgrounds? - `emojis`
- Will the signal be manually changed by the user or it wil be changed after 30 seconds? - `User's job is to change the signal`
- How do the vehicles move? - `All vehicles move to the other side on signal start`
- Will they only go path opposite to them? - `For now they move only straight`
- How many vehicles move at one time? - `All vehicles`
- 

## Design or Mockup
```
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19
                    || 🚖 ||                  
                    || 🚖 ||                  
                    || 🚖 ||                  
                    || 🚖 ||                  
                    || 🚖 ||                  
                    || 🚖 ||                  
                    || 🚖 ||                  
                    || 🚖 ||                  
====================🟢   🔴====================
🚖 🚖 🚖 🚖 🚖 🚖 🚖 🚖       🚖 🚖 🚖 🚖 🚖 🚖 🚖 🚖
====================🔴   🔴====================
                    || 🚖 ||                  
                    || 🚖 ||                  
                    || 🚖 ||                  
                    || 🚖 ||                  
                    || 🚖 ||                  
                    || 🚖 ||                  
                    || 🚖 ||                  
                    || 🚖 ||                  
```

## How will User play?
I am thinking that User will gives input on what gate to open and for how long. In that time user can do nothing.
> Why this? In this way I can do both animation and also takes user input.