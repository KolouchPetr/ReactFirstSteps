import React, { Fragment, useState, useEffect } from "react";
import ReactDOM, { render } from "react-dom";
import "./index.css";

// basic elem
const element = <h1>Hello World!</h1>;

//ReactDOM.render(element, document.getElementById("root"));

// tick element updates each second
function tick() {
  const element = (
    <div>
      <h1>Hellow World!</h1>
      <h2>its {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById("root"));
}

//setInterval(tick, 1000);

// props

function Welcome(props) {
  return <h1>Welcome {props.name}</h1>;
}

class WelcomeClass extends React.Component {
  render() {
    return <h1>Welcome {this.props.name}</h1>;
  }
}

const elem = <Welcome name="kaja"></Welcome>;
const elem1 = <WelcomeClass name="peta"></WelcomeClass>;

/*
ReactDOM.render(elem, document.getElementById("root"));
ReactDOM.render(elem1, document.getElementById("root"));
*/

// rendering mupltiple components via component Function
/*
function App() {
  return (
    <div>
      <Welcome name="easy"></Welcome>
      <WelcomeClass name="jako"></WelcomeClass>
      <Welcome name="tutorial"></Welcome>
    </div>
  );
}
*/

//ReactDOM.render(<App></App>, document.getElementById("root"));

// split components to mupltiple smaller components

// name parts to components not to full context (user/author)
function Avatar(props) {
  return (
    <img className="Avatar" src={props.user.avatarUrl} alt={props.user.name} />
  );
}

function UserInfo(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.user}></Avatar>
        <div className="authorName">{props.user.name}</div>
      </div>
    </div>
  );
}
/*
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}
*/

// not good, we can use classes and states, so we wouldnt neet to setInterval and it would update on its own
/*
function Clock(props) {
  return (
    <div>
      <h1>Hello World!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}
*/
function tick1() {
  ReactDOM.render(
    <Clock date={new Date()}></Clock>,
    document.getElementById("root")
  );
}

// setInterval(tick1, 1000);

// use class with states

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  // lifeCycle methods

  // after component was rendered
  componentDidMount() {
    this.timerID = setInterval(() => {
      this.tick();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({ date: new Date() });
  }

  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
/*
function App() {
  return (
    <div>
      <Clock></Clock>
      <Clock></Clock>
      <Clock></Clock>
    </div>
  );
}
*/
//ReactDOM.render(<App />, document.getElementById("root"));

// updating state values the correct way since it may be async

// Correct
/*
this.setState((state, props) => ({
	counter: state.counter + props.increment
      }));
*/

/*****************************
 *
 *
 * 	Event Handling
 *
 *
 *****************************/

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? "ON" : "OFF"}
      </button>
    );
  }
}

ReactDOM.render(<Toggle />, document.getElementById("root"));

// without having to bind this
/*
<button
  onClick={() => {
    this.handleClick();
  }}
></button>;
*/

// for performance it is better to use bind or class fields syntax

/*****************************
 *
 *
 * 	Conditional Rendering
 *
 *
 *****************************/
// doesnt work as intended, is connected with further function
function LoggedGreeting(props) {
  return <h1>Greetings General Kenobi{props.username}</h1>;
}

function NonLoggedGreeting(props) {
  return <h1>Greetings stranger</h1>;
}

function Greeting(props) {
  if (props.username) {
    return <LoggedGreeting username={props.username}></LoggedGreeting>;
  }
  return <NonLoggedGreeting></NonLoggedGreeting>;
}

function App() {
  return (
    <div>
      <Greeting></Greeting>
      <Greeting username={"petulka"}></Greeting>
    </div>
  );
}

//ReactDOM.render(<App></App>, document.getElementById("root"));

// login logout example
// elements depending on if

function Login(props) {
  return <button onClick={props.onClick}>Login</button>;
}

function Logout(props) {
  return <button onClick={props.onClick}>Logout</button>;
}

class LoginOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
    this.loginOnclick = this.loginOnclick.bind(this);
    this.logoutOnclick = this.logoutOnclick.bind(this);
  }

  loginOnclick() {
    this.setState({ isLoggedIn: true });
  }
  logoutOnclick() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    let isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <Logout onClick={this.logoutOnclick}></Logout>;
    } else {
      button = <Login onClick={this.loginOnclick}></Login>;
    }
    return (
      <div>
        <Greeting username={isLoggedIn}></Greeting>
        {button}
      </div>
    );
  }
}

//ReactDOM.render(<LoginOut></LoginOut>, document.getElementById("root"));

/*****************************
 *
 *
 * 	Conditional Rendering
 * 	- using &&
 *
 *
 *****************************/

function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      {unreadMessages.length > 0 && (
        <h2>You have {unreadMessages.length} unread Messages.</h2>
      )}
    </div>
  );
}

const messages = ["xd", "ses debil", "XD"];
/*
ReactDOM.render(
  <Mailbox unreadMessages={messages}></Mailbox>,
  document.getElementById("root")
);
*/

/*****************************
 *
 *
 * 	Conditional Rendering
 *	- preventing component from rendering
 *
 *****************************/

function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return <div className="warning">Warning!</div>;
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showWarning: true,
    };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState((state) => ({
      showWarning: !state.showWarning,
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning}></WarningBanner>
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? "turn off" : "turn on"}
        </button>
      </div>
    );
  }
}

//ReactDOM.render(<Page></Page>, document.getElementById("root"));

/*****************************
 *
 *
 * 	Conditional Rendering
 * 	-Lists and keys
 *
 *
 *****************************/

//const numbers = [1, 3, 5, 7];

//const listItems = numbers.map((number) => <li>{number}</li>);

//ReactDOM.render(<ul>{listItems}</ul>, document.getElementById("root"));

function RenderList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => (
    <li key={number.toString()}>{number}</li>
  ));

  return <ul>{listItems}</ul>;
}
const numbers = [1, 3, 5, 7];

ReactDOM.render(
  <RenderList numbers={numbers}></RenderList>,
  document.getElementById("root")
);

// use keys on list items
// if we dont have ID at least us index

/*
const todoItems = todos.map((todo, index) => (
  // Only do this if items have no stable IDs
  <li key={index}>{todo.text}</li>
));
*/

function Description(props) {
  return <li>{props.title}</li>;
}

function Content(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
    </div>
  );
}

function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) => (
        <Description title={post.title} key={post.id}></Description>
      ))}
    </ul>
  );

  const content = props.posts.map((post) => (
    <Content title={post.title} content={post.content} key={post.id}></Content>
  ));

  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  { id: 1, title: "Hello World", content: "Welcome to learning React!" },
  { id: 2, title: "Installation", content: "You can install React from npm." },
];

ReactDOM.render(<Blog posts={posts}></Blog>, document.getElementById("root"));

// we can either map array right in the return or do it separately in a variable and then pass the variable

/*****************************
 *
 *
 * 	Controlled Components
 *
 *
 *****************************/

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          name:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="submit" />
      </form>
    );
  }
}

//ReactDOM.render(<NameForm></NameForm>, document.getElementById("root"));

class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "please write an essay",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("essay was submitted " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea
            type="text"
            onChange={this.handleChange}
            value={this.state.value}
          />
        </label>
        <input type="submit" value="submit" />
      </form>
    );
  }
}

//ReactDOM.render(<EssayForm></EssayForm>, document.getElementById("root"));

class SelectInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "coconut",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("selected value " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          {" "}
          Select your favorite flavor:
          <select onChange={this.handleChange} value={this.state.value}>
            <option value="coconut">coconut</option>
            <option value="apple">apple</option>
            <option value="levanduleXD">levanduleXD</option>
            <option value="pjenis">pjenis</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
//ReactDOM.render(<SelectInput></SelectInput>, document.getElementById("root"));

//multiple inputs

class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            type="checkbox"
            name="isGoing"
            checked={this.state.isGoing}
            onChange={this.handleInputChange}
          />
        </label>
        <input
          type="number"
          name="numberOfGuests"
          value={this.state.numberOfGuests}
          onChange={this.handleInputChange}
        />
      </form>
    );
  }
}

ReactDOM.render(<Reservation></Reservation>, document.getElementById("root"));

function WouldBoil(props) {
  if (props.temperature >= 100) {
    return <p>It will boil.</p>;
  }
  return <p>It won't boil.</p>;
}

const scaleNames = {
  c: "celsius",
  f: "fahrenheit",
};

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: "",
      scale: "",
    };
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrnheitChange = this.handleFahrnheitChange.bind(this);
  }

  handleCelsiusChange(temperature) {
    this.setState({ scale: "c", temperature: temperature });
  }

  handleFahrnheitChange(temperature) {
    this.setState({ scale: "f", temperature: temperature });
  }
  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius =
      scale === "f" ? tryConvert(temperature, ToCelsius) : temperature;
    const fahrnheit =
      scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;
    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        ></TemperatureInput>
        <TemperatureInput
          scale="f"
          temperature={fahrnheit}
          onTemperatureChange={this.handleFahrnheitChange}
        ></TemperatureInput>
        <WouldBoil temperature={parseFloat(celsius)}></WouldBoil>
      </div>
    );
  }
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onTemperatureChange(event.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter a temperature in scale {scaleNames[scale]}: </legend>
        <input
          type="text"
          name="temperature"
          value={temperature}
          onChange={this.handleChange}
        />
      </fieldset>
    );
  }
}

function ToCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

ReactDOM.render(<Calculator></Calculator>, document.getElementById("root"));

/*****************************
 *
 *
 * 	Composition vs Inheritance
 *
 *
 *****************************/

// using props.children to use something inside components brackets
function FancyBorder(props) {
  return (
    <div className={"FancyBorder FancyBorder-" + props.color}>
      {props.children}
    </div>
  );
}

function WelcomeDialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">Welcome</h1>
      <p className="Dialog-message">Thank you for visiting our spacecraft!</p>
    </FancyBorder>
  );
}

ReactDOM.render(
  <WelcomeDialog></WelcomeDialog>,
  document.getElementById("root")
);

//multiple children can be named as we wish to

function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className=" SplitPane-left">{props.left}</div>
      <div className="SplitPane-right">{props.right}</div>
    </div>
  );
}

function SplitPaneApp(props) {
  return (
    <SplitPane>
      left={<Contacts></Contacts>}
      right={<Chat></Chat>}
    </SplitPane>
  );
}

function Contacts(props) {
  return <div className="Contacts"></div>;
}

function Chat(props) {
  return <div className="Chat"></div>;
}

ReactDOM.render(<SplitPaneApp></SplitPaneApp>, document.getElementById("root"));

//specialization - when one copmponent is a special case of the other one

function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">{props.title}</h1>
      <p className="Dialog-message">{props.message}</p>
      {props.children}
    </FancyBorder>
  );
}

function WelcomeDialogWithProps(props) {
  return <Dialog title="welcome" message="petulka"></Dialog>;
}

ReactDOM.render(
  <WelcomeDialogWithProps></WelcomeDialogWithProps>,
  document.getElementById("root")
);

// composition while using classes

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = { login: "" };
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program" message="Example message xdxdxd">
        <input value={this.state.login} onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>Sign me up!</button>
      </Dialog>
    );
  }
  handleChange(e) {
    this.setState({ login: e.target.value });
  }

  handleSignUp(e) {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}

ReactDOM.render(<SignUpDialog></SignUpDialog>, document.getElementById("root"));

const items = [
  {
    category: "Sporting Goods",
    price: "$49.99",
    stocked: true,
    name: "Football",
  },
  {
    category: "Sporting Goods",
    price: "$9.99",
    stocked: true,
    name: "Baseball",
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: false,
    name: "Basketball",
  },
  {
    category: "Electronics",
    price: "$99.99",
    stocked: true,
    name: "iPod Touch",
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: false,
    name: "iPhone 5",
  },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" },
];

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      isStockOnly: false,
    };
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleSearchTextChange(e) {
    this.setState({ filterText: e.target.value });
  }

  handleCheckboxChange() {
    this.setState((prevState) => ({
      isStockOnly: !prevState.isStockOnly,
    }));
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          isStockOnly={this.state.isStockOnly}
          handleSearchTextChange={this.handleSearchTextChange}
          handleCheckboxChange={this.handleCheckboxChange}
        ></SearchBar>
        <ProductTable
          items={items}
          filterText={this.state.filterText}
          isStockOnly={this.state.isStockOnly}
        ></ProductTable>
      </div>
    );
  }
}

function SearchBar(props) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={props.filterText}
        onChange={props.handleSearchTextChange}
      />
      <input
        type="checkbox"
        value={props.isStockOnly}
        checked={props.isStockOnly}
        onChange={props.handleCheckboxChange}
      />{" "}
      Only show products in stock
    </div>
  );
}

class ProductTable extends React.Component {
  render() {
    let filterText = this.props.filterText;
    let isStockOnly = this.props.isStockOnly;
    let rows = [];
    let lastCategory = "";

    this.props.items.forEach((item) => {
      if (isStockOnly && !item.stocked) {
        return;
      }
      if (item.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
        return;
      }
      if (item.category != lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={item.category}
            key={item.category}
          ></ProductCategoryRow>
        );
      }
      rows.push(
        <ProductRow
          name={item.name}
          price={item.price}
          stocked={item.stocked}
          key={item.name}
        ></ProductRow>
      );
      lastCategory = item.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

function ProductCategoryRow(props) {
  return (
    <tr>
      <th>{props.category}</th>
    </tr>
  );
}

function ProductRow(props) {
  let elem = "";
  if (props.stocked == false) {
    elem = <td style={{ color: "red" }}>{props.name}</td>;
  } else {
    elem = <td>{props.name}</td>;
  }

  return (
    <tr>
      {elem}
      <td>{props.price}</td>
    </tr>
  );
}

ReactDOM.render(
  <FilterableProductTable></FilterableProductTable>,
  document.getElementById("root")
);

/*****************************
 *
 *
 * 	Advanced Guide
 *
 *
 *****************************/

/*****************************
 *
 *
 * 	Accessibility
 *
 *
 *****************************/

function ListItem({ item }) {
  return (
    <Fragment>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </Fragment>
  );
}

function Glossary(props) {
  return (
    <dl>
      {props.items.map((item) => (
        <ListItem item={item} key={item.id}></ListItem>
      ))}
    </dl>
  );
}

/*****************************
 *
 *
 * 	Context
 *
 *
 *****************************/
// not having to pass props to the whole component tree, this solution is better for global parametres affecting most of the components
// such as language, user or theme

const ThemeContext = React.createContext("light");

class AppAgain extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar></Toolbar>
      </ThemeContext.Provider>
    );
  }
}

function Toolbar() {
  return (
    <div>
      <ThemedButton></ThemedButton>
    </div>
  );
}

class ThemedButton extends React.Component {
  static contextType = ThemeContext;
  render() {
    return <button theme={this.context}></button>;
  }
}

// simpler solution for props

//passing down the whole component

/** 
function PageAgain(props) {
  const user = props.user;
  const userLink = <Link href={user.permalink} size={props.avatarSize}></Link>;
  return <PageLayout userLink={userLink}></PageLayout>;
}


// Now, we have:
<Page user={user} avatarSize={avatarSize} />
// ... which renders ...
<PageLayout userLink={...} />
// ... which renders ...
<NavigationBar userLink={...} />
// ... which renders ...
{props.userLink}


// if we need more separate slots we can use it like this

function PageAgainAgain(props) {
  const user = props.user;
  const content = <Feed user={user}></Feed>;
  const topBar = (
    <NavigationBar>
      <Link href={user.permalink}>
        <Avatar user={user} size={props.avatarSize}></Avatar>
      </Link>
    </NavigationBar>
  );
  return <PageLayout topBar={topBar} content={content}></PageLayout>;
}
*/

/*****************************
 *
 *
 * 	Fragments
 *
 *
 *****************************/

class RenderTable extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <RestOfTheTable></RestOfTheTable>
        </tr>
      </table>
    );
  }
}

function RestOfTheTable() {
  return (
    <>
      <td>1</td>
      <td>2</td>
    </>
  );
}

ReactDOM.render(<RenderTable></RenderTable>, document.getElementById("root"));

/*****************************
 *
 *
 * 	Higher Order Component
 *
 *
 *****************************/

// when we need to use keys, when mapping over an array, use React.Fragment instead,
// since blank element does not support attributes

// when there are similar components, doing almost the same, but with different data source fo exaple
// we might wanna use higher order component - HOC
// we can create a function that returns new class component with data source from its attribute
// following example does not work, since it uses undefined parts

class CommentCount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    };
  }

  handleClick() {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  }

  render() {
    return (
      <div>
        {this.state.count} Count
        <button onClick={this.handleClick}> Increment comment count</button>
      </div>
    );
  }
}

class LikeCount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    };
  }

  handleClick() {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  }

  render() {
    return (
      <div>
        {this.state.count} Count
        <button onClick={this.handleClick}> Increment Like count</button>
      </div>
    );
  }
}

// previous two components do the same thing, just in a different scenario, we can create the HOC now

function HOC(Component, data) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
      this.state = {
        count: 0,
      };
    }

    handleClick() {
      this.setState((prevState) => ({
        count: prevState.count + 1,
      }));
    }
    render() {
      return (
        <Component
          countNumber={this.state.count}
          handleClick={this.handleClick}
        >
          {data}
        </Component>
      );
    }
  };
}

class CommentCountNew extends React.Component {
  render() {
    return (
      <div>
        {this.props.countNumber} Count
        <button onClick={this.props.handleClick}>
          {" "}
          Increment comment count
        </button>
      </div>
    );
  }
}

class LikeCountNew extends React.Component {
  render() {
    return (
      <div>
        {this.props.countNumber} Count
        <button onClick={this.props.handleClick}> Increment Like count</button>
      </div>
    );
  }
}
// now, that we moved some parts to the HOC, we can delete them from the class

const EnhancedLikeCounter = HOC(LikeCountNew);
const EnhancedCommentCounter = HOC(CommentCountNew);

function EnhancedElements() {
  return (
    <div>
      <EnhancedCommentCounter></EnhancedCommentCounter>
      <EnhancedLikeCounter></EnhancedLikeCounter>
    </div>
  );
}

ReactDOM.render(
  <EnhancedElements></EnhancedElements>,
  document.getElementById("root")
);

/*****************************
 *
 *
 * 	JSX in depth
 *
 *
 *****************************/

// store multiple components in an object
const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here xd.</div>;
  },
};

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue"></MyComponents.DatePicker>;
}

/*
// different situation
const components = {
  photo: PhotoStory,
  video: VideoStory,
};

function Story(props) {
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story}></SpecificStory>;
}
*/
// default value of prop is true (if unspecified)

// using spread operator
// these two are equivalent
function App1() {
  return <Greeting firstName="Ben" lastName="Hector"></Greeting>;
}

function App2() {
  const props = { firstName: "Ben", lastName: "Hector" };
  return <Greeting {...props}></Greeting>;
}

// we can pick specific prop and pass the other using spread

const Button = (props) => {
  const { kind, ...rest } = props;
  const className = kind === "primary" ? "PrimaryButton" : "SecondaryButton";
  return <button className={className} {...rest}></button>;
};

const Application = () => {
  return (
    <div>
      <Button kind="primary" onClick={() => console.log("clicked")}>
        Hello World!
      </Button>
    </div>
  );
};

// Calls the children callback numTimes to produce a repeated component
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}

/*
const showHeader = true;

// will work only if showHeader is true

<div>
  {showHeader && <Header />}
  <Content />
</div>;

// without > 0 it would not work as intended because 0 would still work
<div>
  {props.messages.length > 0 &&
    <MessageList messages={props.messages} />
  }
</div>

// if we want to show undefined/null etc
<div>
  My JavaScript variable is {String(myVariable)}.
</div>
*/

/*****************************
 *
 *
 * 	Optimizing performance
 *
 *
 *****************************/

// sometimes we dont need to update a Component when a certain thing changes
// we can ignore this using the shouldComponentUpdate function

// in this example the component will only rerender if color or count number is changed
class CounterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }
  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => {
          this.setState((state) => ({
            count: state.count + 1,
          }));
        }}
      >
        Count {this.state.Count}
      </button>
    );
  }
}

// we can also use React.PureComponent for "shallow comparsion"

class CounterButtonPure extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { count: 1 };
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState((state) => ({ count: state.count + 1 }))}
      >
        Count: {this.state.count}
      </button>
    );
  }
}

// we should not mutate variables and objects
// this is for example how to edit object without mutating it
function updateColorMap(colormap) {
  return { ...colormap, right: "blue" };
}

/*****************************
 *
 *
 * 	Portals
 *
 *
 *****************************/

// portal is a way to render a component inside another element despite being inside a different react tree

// basically this means -> if we have two divs inside the root html, "root" and "someDiv"
// using portals we can render a component inside somediv even tho, the rest of the components we are working with
// are inside "root"

// this means that element that seems like a child of a div in react does not have to be a child
// inside html

const appRoot = document.getElementById("app-root");
const modalRoot = document.getElementById("modal-root");

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return React.createPortal(this.props.children, this.el);
  }
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicks: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState) => ({
      clicks: prevState.clicks + 1,
    }));
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <p>Number Of Clicks: {this.state.clicks}</p>
        <Modal>
          <Child></Child>
        </Modal>
      </div>
    );
  }
}

function Child() {
  return (
    <div className="modal">
      <button> click me</button>
    </div>
  );
}

/*****************************
 *
 *
 * 	Profiling
 *
 *
 *****************************/

// measure how often something renders and its cost
// used in dev to check if something needs optimalization

/*****************************
 *
 *
 * 	Reft And The DOM
 *
 *
 *****************************/

// when we need to edit or work with a specific child element not using props

class MyCompoenent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  render() {
    return <div ref={this.myRef}></div>;
  }
}

// the ref node is accesible like this
// const node = this.myRef.current;

//for example managing focus

class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.focusInput = this.focusInput.bind(this);
  }

  focusInput() {
    this.textInput.current.focus();
  }

  render() {
    return (
      <div>
        <input type="text" ref={this.textInput} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusInput}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <CustomTextInput></CustomTextInput>,
  document.getElementById("root")
);

/*****************************
 *
 *
 * 	Render props
 *
 *
 *****************************/
class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around</h1>
        <Mouse render={(mouse) => <Cat mouse={mouse}></Cat>}></Mouse>
      </div>
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = {
      x: 0,
      y: 0,
    };
  }
  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  }
  render() {
    return (
      <div style={{ height: "100vh" }} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img
        src={require("./cat.jpg").default}
        style={{
          position: "absolute",
          left: mouse.x,
          top: mouse.y,
          width: "10%",
        }}
      ></img>
    );
  }
}

ReactDOM.render(<MouseTracker></MouseTracker>, document.getElementById("root"));

// antother example

class DisplayData extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul>
        {this.props.list.map((listPart) => (
          <li>{listPart}</li>
        ))}
      </ul>
    );
  }
}

class Department extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: ["Dev", "Big Data", "Mobility"],
    };
  }

  render() {
    return (
      <div>
        <h2>Department List...</h2>
        {this.props.render(this.state.list)}
      </div>
    );
  }
}

class Project extends React.Component {
  render() {
    return (
      <div>
        <h2>Projects List...</h2>
        {this.props.render(this.props.list)}
      </div>
    );
  }
}

class RenderPropsApp extends React.Component {
  render() {
    return (
      <>
        <Department
          render={(data) => <DisplayData list={data}></DisplayData>}
        ></Department>
        <Project
          render={() => (
            <DisplayData list={["P-1", "P-2", "P-3"]}></DisplayData>
          )}
        ></Project>
      </>
    );
  }
}

ReactDOM.render(
  <RenderPropsApp></RenderPropsApp>,
  document.getElementById("root")
);

/*****************************
 *
 *
 * 	Uncontrolled components
 *
 *
 *****************************/

// it is recommended to use controlled components for forms
// but we cant do this in file input
// we need to use refs for this

class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  handleSubmit(e) {
    e.preventDefault();
    alert(`Selected file is ${this.fileInput.current.files[0].name}`);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="file" ref={this.fileInput} />
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

ReactDOM.render(<FileInput />, document.getElementById("root"));

/*****************************
 *
 *
 * Web components
 *
 *
 *****************************/
// nothing interesting at least not for now

/*****************************
 *
 *
 * 	Hooks
 *
 *
 *****************************/

// use hooks without classes

// import { useState } from "react";

function StateExample() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>you clicked {count} times so far</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increase count value
      </button>
    </div>
  );
}

ReactDOM.render(<StateExample></StateExample>, document.getElementById("root"));

/*****************************
 *
 *
 * 	State Hook
 *
 *
 *****************************/

function ExampleWithManyStates() {
  const [age, setAge] = useState(0);
  const [fruit, setFruit] = useState("banana");
  const [todos, setTodos] = useState([{ text: "learning hooks" }]);
}

/*****************************
 *
 *
 * 	Effect Hook
 *
 *
 *****************************/

// use effect hook is almost the same as component did mount etc.. in class components
// but we dont have to specify each so we dont have to repeat the code
function EffectHookExample() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>click and see the title</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click me
      </button>
    </div>
  );
}

ReactDOM.render(
  <EffectHookExample></EffectHookExample>,
  document.getElementById("root")
);

// the same but as a class component

class EffectClassExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  render() {
    return (
      <div>
        <p>click and see the title</p>
        <button
          onClick={() => {
            this.setState({ count: this.state.count + 1 });
          }}
        >
          Click me
        </button>
      </div>
    );
  }
}

// even tho it seems we would need a separate function in a hook to do something else when mount and when unmount
// but we can return a function as in the example

//in this example we subscribe using an API and unsubscribe on the component unmount

/*
function FriendStatus(props) {
  const [isOnline, setStatus] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setStatus(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.frien.id, handleStatusChange);
    };
  });
}
*/

// you can use multiple effect hooks in a single function
/*
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setStatus] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setStatus(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.frien.id, handleStatusChange);
    };
  });
  ...
}
*/

// hooks also help us not make bugs
// for example in a class component, if the user would change we would display the online status
// for a wrong person because we have to handle previous props in componentDidUpdate
// as seen here
// but we dont have to handle this using hooks
/*
componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentDidUpdate(prevProps) {
    // Unsubscribe from the previous friend.id
    ChatAPI.unsubscribeFromFriendStatus(
      prevProps.friend.id,
      this.handleStatusChange
    );
    // Subscribe to the next friend.id
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
  */

// sometimes we dont need the effect hook to run
// it runs everytime
// in class component we could make an easy comparsion like this

/*
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
*/

// in hooks, we can add a optional argument, so the hook will only work if the value in argument has changed

/*
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // Only re-run the effect if count changes
*/

// also works for effect hook with cleanup

/*
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
}, [props.friend.id]); // Only re-subscribe if props.friend.id changes
*/

// if we dont need to rerun effect hook and only use it once, just pass an empty array
// as the second argument []

/*****************************
 *
 *
 * 	Custom Hooks
 *
 *
 *****************************/

// we can share logic by creating custom hooks

/*
function getFriendStatus(friendID) {
  const [isOnline, setState] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setState(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  }, [props.friend.id]);
  return isOnline;
}
*/

const friendList = [
  { id: 1, name: "Petulka" },
  { id: 2, name: "Trixinka" },
  { id: 3, name: "Xdinka" },
];

/*
function ChatRecipientPicker() {
  const [recipientID, setRecipientId] = useState(1);
  const isRecipientOnline = useFriendStatus(recipientID);

  return (
    <>
      <Circle color={isRecipientOnline ? "green" : "red"}></Circle>
      <select
        value={recipientID}
        onChange={(e) => setRecipientId(e.target.value)}
      >
        {friendList.map((friend) => (
          <option value={friend.id} key={friend.id}>
            {friend.name}
          </option>
        ))}
      </select>
    </>
  );
}
*/
