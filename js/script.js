 // Toggle section content
    function toggleContent(element) {
      const content = element.nextElementSibling;
      content.classList.toggle('show');
    }

    // Toggle code type
    function toggleCode(section, type) {
      const sectionElement = document.getElementById(section);
      const buttons = sectionElement.querySelectorAll('.code-toggle-btn');
      const codeBlocks = sectionElement.querySelectorAll('.code-block');
      buttons.forEach(btn => btn.classList.remove('active'));
      codeBlocks.forEach(block => block.classList.remove('show'));
      sectionElement.querySelector(`.code-toggle-btn[data-type="${type}"]`).classList.add('active');
      sectionElement.querySelector(`.code-block[data-type="${type}"]`).classList.add('show');
    }

    // Simulated code execution
    function runCode(outputId, fn) {
      const output = document.getElementById(outputId);
      try {
        const result = fn();
        output.textContent = result;
      } catch (e) {
        output.textContent = `Error: ${e.message}`;
      }
    }

    // Factory
    class Car { drive() { return "Driving a car"; } }
    class Truck { drive() { return "Driving a truck"; } }
    class VehicleFactory {
      static createVehicle(type) {
        switch (type) {
          case "car": return new Car();
          case "truck": return new Truck();
          default: throw new Error("Unknown vehicle type");
        }
      }
    }
    function runFactory() {
      const section = document.getElementById('factory');
      const activeType = section.querySelector('.code-toggle-btn.active').dataset.type;
      if (activeType === 'typescript') {
        const car = VehicleFactory.createVehicle("car");
        const truck = VehicleFactory.createVehicle("truck");
        return `${car.drive()}\n${truck.drive()}`;
      } else {
        const car = { drive: () => "Driving a car" };
        const truck = { drive: () => "Driving a truck" };
        return `${car.drive()}\n${truck.drive()}`;
      }
    }

    // Builder
    class House {
      toString() { return `House with ${this.walls} walls, ${this.doors} doors, ${this.windows} windows`; }
    }
    class HouseBuilder {
      constructor() { this.house = new House(); }
      setWalls(walls) { this.house.walls = walls; return this; }
      setDoors(doors) { this.house.doors = doors; return this; }
      setWindows(windows) { this.house.windows = windows; return this; }
      build() { return this.house; }
    }
    function runBuilder() {
      const section = document.getElementById('builder');
      const activeType = section.querySelector('.code-toggle-btn.active').dataset.type;
      if (activeType === 'typescript') {
        const house = new HouseBuilder().setWalls(4).setDoors(2).setWindows(6).build();
        return house.toString();
      } else {
        const house = { walls: 4, doors: 2, windows: 6 };
        return `House with ${house.walls} walls, ${house.doors} doors, ${house.windows} windows`;
      }
    }

    // Revealing Constructor
    class ImmutableBuffer {
      constructor(size, initializer) {
        this.buffer = new Array(size).fill(0);
        initializer(this.buffer);
        Object.freeze(this.buffer);
      }
      read() { return this.buffer.join(", "); }
    }
    function runRevealingConstructor() {
      const section = document.getElementById('revealing-constructor');
      const activeType = section.querySelector('.code-toggle-btn.active').dataset.type;
      if (activeType === 'typescript') {
        const buffer = new ImmutableBuffer(3, (b) => { b[0] = 1; b[1] = 2; b[2] = 3; });
        return buffer.read();
      } else {
        const buffer = [1, 2, 3];
        Object.freeze(buffer);
        return buffer.join(", ");
      }
    }

    // Singleton
    class Database {
      static instance;
      constructor() { this.message = "Database connection initialized"; }
      static getInstance() {
        if (!Database.instance) Database.instance = new Database();
        return Database.instance;
      }
      query(sql) { return `Executing query: ${sql}`; }
    }
    function runSingleton() {
      const section = document.getElementById('singleton');
      const activeType = section.querySelector('.code-toggle-btn.active').dataset.type;
      if (activeType === 'typescript') {
        const db1 = Database.getInstance();
        const db2 = Database.getInstance();
        return `${db1.query("SELECT * FROM users")}\nSame instance: ${db1 === db2}`;
      } else {
        const db1 = (function() {
          let instance;
          return {
            getInstance: () => instance || (instance = { query: (sql) => `Executing query: ${sql}` })
          };
        })();
        const instance1 = db1.getInstance();
        const instance2 = db1.getInstance();
        return `${instance1.query("SELECT * FROM users")}\nSame instance: ${instance1 === instance2}`;
      }
    }

    // Dependency Injection
    class ConsoleLogger { log(message) { return `Console: ${message}`; } }
    class UserService {
      constructor(logger) { this.logger = logger; }
      createUser(name) { return this.logger.log(`User ${name} created`); }
    }
    function runDependencyInjection() {
      const section = document.getElementById('dependency-injection');
      const activeType = section.querySelector('.code-toggle-btn.active').dataset.type;
      if (activeType === 'typescript') {
        const logger = new ConsoleLogger();
        const service = new UserService(logger);
        return service.createUser("Ali");
      } else {
        function ConsoleLogger() {
          this.log = (message) => `Console: ${message}`;
        }
        function UserService(logger) {
          this.logger = logger;
          this.createUser = (name) => this.logger.log(`User ${name} created`);
        }
        const logger = new ConsoleLogger();
        const service = new UserService(logger);
        return service.createUser("Ali");
      }
    }

    // Proxy
    class RealSubject { request() { return "RealSubject: Handling request"; } }
    class ProxySubject {
      constructor() { this.realSubject = new RealSubject(); }
      request() { return `Proxy: Logging before request\n${this.realSubject.request()}`; }
    }
    function runProxy() {
      const section = document.getElementById('proxy');
      const activeType = section.querySelector('.code-toggle-btn.active').dataset.type;
      if (activeType === 'typescript') {
        const proxy = new ProxySubject();
        return proxy.request();
      } else {
        function RealSubject() {
          this.request = () => "RealSubject: Handling request";
        }
        function ProxySubject() {
          this.realSubject = new RealSubject();
          this.request = () => `Proxy: Logging before request\n${this.realSubject.request()}`;
        }
        const proxy = new ProxySubject();
        return proxy.request();
      }
    }

    // Decorator
    function Logger(target, propertyKey, descriptor) {
      const originalMethod = descriptor.value;
      descriptor.value = function (...args) {
        return `Calling ${propertyKey} with ${args.join(", ")}. Result: ${originalMethod.apply(this, args)}`;
      };
    }
    class Calculator {
      add(a, b) { return a + b; }
    }
    Logger(Calculator.prototype, "add", Object.getOwnPropertyDescriptor(Calculator.prototype, "add"));
    function runDecorator() {
      const section = document.getElementById('decorator');
      const activeType = section.querySelector('.code-toggle-btn.active').dataset.type;
      if (activeType === 'typescript') {
        const calc = new Calculator();
        return calc.add(5, 3);
      } else {
        function Calculator() {}
        Calculator.prototype.add = function(a, b) {
          return a + b;
        };
        const originalAdd = Calculator.prototype.add;
        Calculator.prototype.add = function(...args) {
          return `Calling add with ${args.join(", ")}. Result: ${originalAdd.apply(this, args)}`;
        };
        const calc = new Calculator();
        return calc.add(5, 3);
      }
    }

    // Adapter
    class OldUserService { getUser() { return { firstName: "Ali", lastName: "Ahmed" }; } }
    class UserAdapter {
      constructor(oldUser) { this.oldUser = oldUser; }
      get fullName() { return `${this.oldUser.firstName} ${this.oldUser.lastName}`; }
    }
    function runAdapter() {
      const section = document.getElementById('adapter');
      const activeType = section.querySelector('.code-toggle-btn.active').dataset.type;
      if (activeType === 'typescript') {
        const oldService = new OldUserService();
        const adapter = new UserAdapter(oldService.getUser());
        return `Adapted user: ${adapter.fullName}`;
      } else {
        function OldUserService() {
          this.getUser = () => ({ firstName: "Ali", lastName: "Ahmed" });
        }
        function UserAdapter(oldUser) {
          this.oldUser = oldUser;
          Object.defineProperty(this, 'fullName', {
            get: () => `${this.oldUser.firstName} ${this.oldUser.lastName}`
          });
        }
        const oldService = new OldUserService();
        const adapter = new UserAdapter(oldService.getUser());
        return `Adapted user: ${adapter.fullName}`;
      }
    }

    // Strategy
    class CreditCardPayment { pay(amount) { return `Paid ${amount} via Credit Card`; } }
    class PayPalPayment { pay(amount) { return `Paid ${amount} via PayPal`; } }
    class PaymentContext {
      constructor(strategy) { this.strategy = strategy; }
      setStrategy(strategy) { this.strategy = strategy; }
      executePayment(amount) { return this.strategy.pay(amount); }
    }
    function runStrategy() {
      const section = document.getElementById('strategy');
      const activeType = section.querySelector('.code-toggle-btn.active').dataset.type;
      if (activeType === 'typescript') {
        const paymentContext = new PaymentContext(new CreditCardPayment());
        const result1 = paymentContext.executePayment(100);
        paymentContext.setStrategy(new PayPalPayment());
        const result2 = paymentContext.executePayment(200);
        return `${result1}\n${result2}`;
      } else {
        function CreditCardPayment() {
          this.pay = (amount) => `Paid ${amount} via Credit Card`;
        }
        function PayPalPayment() {
          this.pay = (amount) => `Paid ${amount} via PayPal`;
        }
        function PaymentContext(strategy) {
          this.strategy = strategy;
          this.setStrategy = (newStrategy) => this.strategy = newStrategy;
          this.executePayment = (amount) => this.strategy.pay(amount);
        }
        const paymentContext = new PaymentContext(new CreditCardPayment());
        const result1 = paymentContext.executePayment(100);
        paymentContext.setStrategy(new PayPalPayment());
        const result2 = paymentContext.executePayment(200);
        return `${result1}\n${result2}`;
      }
    }

    // State
    class ConnectedState { send(data) { return `Sent: ${data}`; } }
    class DisconnectedState { send(data) { return "Error: Disconnected"; } }
    class Socket {
      constructor() { this.state = new DisconnectedState(); }
      setState(state) { this.state = state; }
      send(data) { return this.state.send(data); }
    }
    function runState() {
      const section = document.getElementById('state');
      const activeType = section.querySelector('.code-toggle-btn.active').dataset.type;
      if (activeType === 'typescript') {
        const socket = new Socket();
        socket.setState(new ConnectedState());
        return socket.send("Hello");
      } else {
        function ConnectedState() {
          this.send = (data) => `Sent: ${data}`;
        }
        function DisconnectedState() {
          this.send = (data) => "Error: Disconnected";
        }
        function Socket() {
          this.state = new DisconnectedState();
          this.setState = (state) => this.state = state;
          this.send = (data) => this.state.send(data);
        }
        const socket = new Socket();
        socket.setState(new ConnectedState());
        return socket.send("Hello");
      }
    }

    // Template
    class DataProcessor {
      process() { return `${this.step1()}\n${this.step2()}`; }
      step1() { return "Reading data"; }
      step2() { return "Processing data"; }
    }
    class CSVProcessor extends DataProcessor {
      step1() { return "Reading CSV"; }
      step2() { return "Processing CSV data"; }
    }
    function runTemplate() {
      const section = document.getElementById('template');
      const activeType = section.querySelector('.code-toggle-btn.active').dataset.type;
      if (activeType === 'typescript') {
        const processor = new CSVProcessor();
        return processor.process();
      } else {
        function DataProcessor() {}
        DataProcessor.prototype.process = function() {
          return this.step1() + "\n" + this.step2();
        };
        function CSVProcessor() {}
        CSVProcessor.prototype = Object.create(DataProcessor.prototype);
        CSVProcessor.prototype.step1 = function() { return "Reading CSV"; };
        CSVProcessor.prototype.step2 = function() { return "Processing CSV data"; };
        const processor = new CSVProcessor();
        return processor.process();
      }
    }

    // Iterator
    class UserCollection {
      constructor(users) { this.users = users; }
      createIterator() {
        let index = 0;
        return {
          next: () => (index < this.users.length ? this.users[index++] : null),
          hasNext: () => index < this.users.length
        };
      }
    }
    function runIterator() {
      const section = document.getElementById('iterator');
      const activeType = section.querySelector('.code-toggle-btn.active').dataset.type;
      if (activeType === 'typescript') {
        const collection = new UserCollection(["Ali", "Basant", "Mona"]);
        const iterator = collection.createIterator();
        let result = "";
        while (iterator.hasNext()) {
          result += `${iterator.next()}\n`;
        }
        return result;
      } else {
        function UserCollection(users) {
          this.users = users;
        }
        UserCollection.prototype.createIterator = function() {
          let index = 0;
          return {
            next: () => (index < this.users.length ? this.users[index++] : null),
            hasNext: () => index < this.users.length
          };
        };
        const collection = new UserCollection(["Ali", "Basant", "Mona"]);
        const iterator = collection.createIterator();
        let result = "";
        while (iterator.hasNext()) {
          result += `${iterator.next()}\n`;
        }
        return result;
      }
    }

    // Middleware
    class LoggerMiddleware { process(data) { return `Logged: ${data}`; } }
    class AuthMiddleware { process(data) { return `Authenticated: ${data}`; } }
    class MiddlewareManager {
      constructor() { this.middlewares = []; }
      add(middleware) { this.middlewares.push(middleware); }
      execute(data) {
        let result = data;
        for (const middleware of this.middlewares) {
          result = middleware.process(result);
        }
        return result;
      }
    }
    function runMiddleware() {
      const section = document.getElementById('middleware');
      const activeType = section.querySelector('.code-toggle-btn.active').dataset.type;
      if (activeType === 'typescript') {
        const manager = new MiddlewareManager();
        manager.add(new LoggerMiddleware());
        manager.add(new AuthMiddleware());
        return manager.execute("Request");
      } else {
        function LoggerMiddleware() {
          this.process = (data) => `Logged: ${data}`;
        }
        function AuthMiddleware() {
          this.process = (data) => `Authenticated: ${data}`;
        }
        function MiddlewareManager() {
          this.middlewares = [];
          this.add = (middleware) => this.middlewares.push(middleware);
          this.execute = (data) => {
            let result = data;
            for (const middleware of this.middlewares) {
              result = middleware.process(result);
            }
            return result;
          };
        }
        const manager = new MiddlewareManager();
        manager.add(new LoggerMiddleware());
        manager.add(new AuthMiddleware());
        return manager.execute("Request");
      }
    }

    // Command
    class Light { turnOn() { return "Light is ON"; } }
    class TurnOnCommand {
      constructor(light) { this.light = light; }
      execute() { return this.light.turnOn(); }
    }
    class RemoteControl { submit(command) { return command.execute(); } }
    function runCommand() {
      const section = document.getElementById('command');
      const activeType = section.querySelector('.code-toggle-btn.active').dataset.type;
      if (activeType === 'typescript') {
        const light = new Light();
        const turnOnCommand = new TurnOnCommand(light);
        const remote = new RemoteControl();
        return remote.submit(turnOnCommand);
      } else {
        function Light() {
          this.turnOn = () => "Light is ON";
        }
        function TurnOnCommand(light) {
          this.light = light;
          this.execute = () => this.light.turnOn();
        }
        function RemoteControl() {
          this.submit = (command) => command.execute();
        }
        const light = new Light();
        const turnOnCommand = new TurnOnCommand(light);
        const remote = new RemoteControl();
        return remote.submit(turnOnCommand);
      }
    }
document.addEventListener("DOMContentLoaded", function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navUl = document.querySelector('nav ul');

  if (menuToggle && navUl) {
    menuToggle.addEventListener('click', function() {
      navUl.classList.toggle('active');
    });

    // إخفاء القائمة عند النقر على رابط
    navUl.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navUl.classList.remove('active');
      });
    });
  }
});