### Starting Project

```bash
> npm install
> npm run start:dev
```

_To test, import `postman/addresses.postman_collection.json` into postman._

OR

```bash
> npm run test
```

### Code Infra decisions

- I know the server structure is total overkill. I know of two ways of doing things w/ code - preparing for scale without guessing, or very simple. For me, the “preparing for scale” route is the obvious choice because I have my own pre-built boilerplate scalable code skeletons that I keep up to date and am able to spin up quickly. Also, much of what you see here are some of my dev tool preferences :)
- For REST projects, I generally prefer `Router->Validator->Controller->Service->DataLayer`; in this case the Data Layer is the `AddressCache`, and given that it’s just a JSON collection, I opted to keep it dumb - just one getter and a couple setters.
- Better typing - I prefer duck-typing when moving fast :)
- Much better validation . I generally don’t like doing validation in the service layer. I’d probably do payload validation up-front using something like Joe or Yup as a middleware between the route and controller, and then allow the data layer to re-validate it’s own constraints. As is, decided to only sanitize the create endpoint.
- API token - probably could stub a POST ‘/token’ endpoint that returns a signed token, where all `/address` routes require a `Bearer ${authToken}` header
- Documentation. With time constraints, I was deciding between swagger docs and importing a postman collection. Decided to go with postman collection.

### Address decisions

- Could have potentially used a map, but I thought I’d end up guessing on which parts to index (especially since the main req was to support a fuzzy search). A couple speculative fields that may have been worthwhile to index - `line1`, `zip` - because a potential guess on product UX is that folks usually are pretty good about fully entering those strings.
- Did not include ‘PUT’ b/c thought it strange to try to update an input w/ no unique id with no constraint (where really the address itself is the unique constraint)
- Also, made the ‘POST’ a ‘create’ rather than an ‘upsert’ because if we determine the address already exists (with these requirements), it should not be altered. Is there legislation around changing an address? Lol shrug
- I considered doing more with removing whitespace, which would allow a perhaps more accurate comparison where unnecessary spaces are an issue, but wasn’t sure how smart to make it (and subsequently, how much time I’d put in). I suppose a simple trimming from the end wouldn’t hurt?

### Testing

- I prefer not being dogmatic about TDD. If limited time, choose testing mechanism that allows you to sleep. If time not limited, get 100% coverage. I opted for unit testing around the address cache (core business logic) and integration tests covering each api endpoint.
