# SchoolsLookUp
> A component responsible for handling Edco lookup.

![data flow](./../../../docs/school%20lookup%20data%20flow.png?raw=true "Data Flow")

### Why don't we save data directly inside SchoolsLookUp?
* Data in that case could be from an EdCo-selected school result or a manually entered one.
* We are already saving school details outside the component, so it felt redundant to save the details inside the component at the same time.

### Why do we have multiple methods dedicated to rendering?
* We have a lot of fields that are displayed at different cases which led to a big render method, but redundancy can be spotted.
* To minimise redundancy, we can move any repetitive snippet into a method and just reuse it saving space and enhancing readability.

### Why do we have a lot of props?
* We need to avoid static attributes and provide some flexibility to the container.
* For instance, we may need to set input id and name, so it's better to have that as a prop.
* Sometimes an optional prop with a default value is a better option, so that whenever it is not needed, we don't have to pass it.

### How are fields validated?
* Validation logic itself does not exist inside the `SchoolsLookUp` component, as that's not the component's own responsibility.
* A validation trigger is inserted into the component, to be executed whenever a change occurs.
* Error messages are passed from the outer scope into the component to be displayed there.

![container](./../../../docs/school%20lookup%20container.png?raw=true "Container")

### Why do we need SchoolsLookUpContainer?
* `SchoolsLookUp` needed to be re-rendered in order to notice new values passed via props.
* Storybook loaded the component once, and ignores whatever changes occur later.
* State can re-render `SchoolsLookUp`, when it changes - more info on [state and lifecycle here](https://reactjs.org/docs/state-and-lifecycle.html).
