# ethereum-tutoring-tipper

Demo project for the blockchain seminar at TUM, winter semester 18/19.

University courses are typically broken down into lecture and exercise units. The exercises are an essential part in the student’s venture of achieving a good grade and are handed off to PhD students besides their actual work without getting enough extra time allocated.
A typical approach to motivate and gratify the tutor in such a situation would be monetary, e.g. by tipping. This however leaves us with the question when the tips will be payed.

In a first option, students tip the tutor at the beginning of the semester. This forces the students to trust the tutor with doing a good job despite already having received his incentive.
In a second option, students tip the tutor at the end of the se- mester. Now the tutor has to trust the students to actually tip him despite already having received the service.
This is a common situation where both parties do not necessarily know and therefore trust each other upfront. It makes it difficult to agree on a way of conducting a transaction.

Is there a solution which does not require mutual trust? Imagine a third party, which accepts the tips of the students at the beginning of the semester and tells the tutor how much he would get if he does a good job. But only if the results are satisfactory he is payed out, otherwise the tips are returned to the students.
Both the students and the tutor now only have to trust this third party and not each other. Smart Contracts can be used to build such a third party, and one that is easy to trust on top, since they are deterministic and immutable computer programs with their source code publicly available to everyone.

## Documentation

* [Report](report/G2%20-%20Report.pdf)
* [Presentation](https://docs.google.com/presentation/d/1rwpxeCdKJNuflU0sjRvAA1EXHnhy9tozQXgBYgD3rAI/edit?usp=sharing)

## Run development version

	# Start Ganache
    npm i # if requirements changed
	npm run contracts # everytime truffle is restarted or contracts changed
	npm start
    npm run prettify # before comitting
