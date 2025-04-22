# InVitro

Platform to book appointments with doctors

## Acknowledgements

- [Screaming Architecture](https://medium.com/all-you-need-is-clean-code/screaming-architecture-a2cd25fe3eec)
- [Vertical Slicing](https://www.plainconcepts.com/es/recursos/vertical-slice-architecture/)
- [Domain Driven Design](https://medium.com/@jonathanloscalzo/domain-driven-design-principios-beneficios-y-elementos-primera-parte-aad90f30aa35)
- [Ports and Adapters Architecture](https://medium.com/the-software-architecture-chronicles/ports-adapters-architecture-d19f2d476eca)
- [DAO Pattern](https://www.oscarblancarteblog.com/2018/12/10/data-access-object-dao-pattern/)
- [Criteria Pattern](https://medium.com/@zerodata.aolink/desafiando-la-complejidad-c%C3%B3mo-el-patr%C3%B3n-criteria-resuelve-la-explosi%C3%B3n-de-m%C3%A9todos-de-nuestro-60ece5829f89)
- [Event Driven Architecture](https://aws.amazon.com/event-driven-architecture/)

## Setup

Install dependencies through NPM:

```
npm install
```

## Run Locally

```
npm run dev
```

## AI

AI was used to generate base UI.

## Limitations

Testing is missing due to time limitations

## Next Steps

Create real DAOs for Firestore, Dynamo or any data source.
The project architecture allow us to create a DAO and only implement it in the service without the need of modify anything else.

We should implement dependency injection to reduce code and effort in the future. Now dependencies are passed via constructor.
