# mealticket

MealTicket: Approve expenses, send reimbursements

A Free and Open faucet design to bring pizza to the people.

Most things are scams, but the pizza is real - A prototype 'pizza faucet' a la PizzaDAO.

WHAT MEALTICKET DOES
--------------------

MealTicket can be deployed for many faucet purposes in Public Goods. In this example, we'll use the Pizza Faucet that MealTicket is being written to create.

Using the pizza fund (treasury) promises are made (and kept!) to buy pizza for people around the world.

Let's say a human named Ryan in Canada wanted to use the Pizza Faucet.
- He would go to his favourite independent pizza place and order a pie to share with friends.
- He'd take a picture of the receipt, the pizza, and a few of people enjoying the pizza.
- He'd post those pictures publicly, tagging apropriately (Commonly on Twitter, but Mastodon and Facebook can be supported too if the faucet takes a URL) (there may be some privacy wrangling here, not posting the receipt publicly, whatever)
- He'd visit mealticket.pizzadao.xyz or faucet.whatever
- He'd upload his receipt, he'd enter the number explicitly to be sure (maybe with a little OCR suggest-helper)
- He'd put in his ENS name lol - this part is a little unclear. Does a wallet connection have to happen here? To post things to IPFS, and to go to a dapp for approval? maybe not. Maybe sending a tx for redemption can be optional.
- He would wait his reimbursement to land at his wallet address after the humans reviewing faucet submissions approve his request
- Ryan has spent $CAD cash, or credit, and has been reimbursed with {some cryptocurrency}  -- This part feels pretty important to bridge. Is there a provider that can do something good here? Saying to the end user, who has effectively just used the faucet to turn fiat in tokens, (and who wants not tokens, but fiat cash to buy more pizza with), "use an exchange" feels bad.

There'll need to be a nice friendly front-end for pizza-eaters, and a simple-powerful flow for reviewers, funders, etc.
Some WIREFRAMES will be nice here.


----

Development plan (please contribute!)

maybe we 
it may be something like:
Build the web2 version with whatever automation platform is easiest
get the flow right
then port it to web3 the right way
