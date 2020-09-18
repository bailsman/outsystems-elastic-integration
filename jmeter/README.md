# JMeter + Selenium WebDriver

## Use Cases

One use case is to [automate the usage of demo applications](generate-sample-logs.jmx) to generate log data on the platform.

## Configuration

1. Make sure you have the [JMeter Plugin Manager](https://jmeter-plugins.org/wiki/PluginInstall/) installed.
2. Open JMeter, go to `Options > Plugins Manager` and select the `Selenium/WebDriver Support`.
3. When you use the Selenium WebDriver, JMeter will run the test plan in an instance of the actual chosen browser, so if you choose to run your test plan in Firefox, you need to have Firefox installed in your system beforehand. [Firefox](https://jmeter-plugins.org/wiki/FirefoxDriverConfig/) and [Chrome](https://jmeter-plugins.org/wiki/ChromeDriverConfig/) are the best choices. Here are (very) quick instructions on how to setup each one:
    * __Firefox:__
        * Download the [geckodriver](https://github.com/mozilla/geckodriver) from [here](https://github.com/mozilla/geckodriver/releases).
        * Unpack it to somewhere (let's call it `$GECKODRIVER_HOME_DIR`).
        * Edit the file `$JMETER_HOME_DIR/bin/system.properties` and add the property `webdriver.gecko.driver=$GECKODRIVER_HOME_DIR/geckodriver`.
        * You're now ready to use Firefox in your test plans.
    * __Chrome:__
        * Download the [ChromeDriver](https://chromedriver.chromium.org/) from [here](https://chromedriver.chromium.org/downloads).
        * Unpack it to somewhere (let's call it `$CHROME_DRIVER_HOME_DIR`).
        * Specify the location of the Chrome Driver binary in the `Chrome` tab of the `Chrome Driver Config` element of your test plan.
        * You're now ready to use Chrome in your test plans.

## More Information

If you want/need to know more about how to write JMeter test plans using Selenium WebDriver, please refer to the [official documentation](https://jmeter-plugins.org/wiki/WebDriverTutorial/).