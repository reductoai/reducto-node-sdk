# Changelog

## 0.4.0 (2025-04-04)

Full Changelog: [v0.3.0...v0.4.0](https://github.com/reductoai/reducto-node-sdk/compare/v0.3.0...v0.4.0)

### Features

* **api:** api update ([#30](https://github.com/reductoai/reducto-node-sdk/issues/30)) ([bb9b6dc](https://github.com/reductoai/reducto-node-sdk/commit/bb9b6dcdcf2c18b901dd0c67aabc2923b2475b6d))
* **api:** api update ([#32](https://github.com/reductoai/reducto-node-sdk/issues/32)) ([d2f4b3c](https://github.com/reductoai/reducto-node-sdk/commit/d2f4b3cee3936085ddf86cb43411a9de20ba054c))
* **api:** api update ([#33](https://github.com/reductoai/reducto-node-sdk/issues/33)) ([1753779](https://github.com/reductoai/reducto-node-sdk/commit/17537795519d5efcba4e727e35a699a382baa83d))
* **api:** api update ([#34](https://github.com/reductoai/reducto-node-sdk/issues/34)) ([e814ed9](https://github.com/reductoai/reducto-node-sdk/commit/e814ed92eede085a013cdc7a7f80d01ee9b4a7b6))
* **api:** api update ([#35](https://github.com/reductoai/reducto-node-sdk/issues/35)) ([a8819aa](https://github.com/reductoai/reducto-node-sdk/commit/a8819aa2038ff3a4ebc3e8569b5d1347f7d0d091))
* **api:** api update ([#37](https://github.com/reductoai/reducto-node-sdk/issues/37)) ([83125e1](https://github.com/reductoai/reducto-node-sdk/commit/83125e16052d5110966fe2623991acade8fd6072))
* **api:** api update ([#38](https://github.com/reductoai/reducto-node-sdk/issues/38)) ([778db4d](https://github.com/reductoai/reducto-node-sdk/commit/778db4d5f4c86f11959c1dce549bc631e61e05d5))


### Bug Fixes

* **api:** improve type resolution when importing as a package ([#41](https://github.com/reductoai/reducto-node-sdk/issues/41)) ([198c64a](https://github.com/reductoai/reducto-node-sdk/commit/198c64a93b0d356e75c89948cdea0d3d8357f8b1))
* **client:** send `X-Stainless-Timeout` in seconds ([#39](https://github.com/reductoai/reducto-node-sdk/issues/39)) ([08c94b9](https://github.com/reductoai/reducto-node-sdk/commit/08c94b9baaaf977fbfcc94602c756e38ef013085))
* **internal:** work around https://github.com/vercel/next.js/issues/76881 ([#36](https://github.com/reductoai/reducto-node-sdk/issues/36)) ([f31b51e](https://github.com/reductoai/reducto-node-sdk/commit/f31b51e304e422427b5b73d964c5e13612c74b4c))


### Chores

* **internal:** add aliases for Record and Array ([#40](https://github.com/reductoai/reducto-node-sdk/issues/40)) ([8ffc917](https://github.com/reductoai/reducto-node-sdk/commit/8ffc9178501d0aee5845617bcd23e4fa6507ba2b))

## 0.3.0 (2025-03-22)

Full Changelog: [v0.2.0...v0.3.0](https://github.com/reductoai/reducto-node-sdk/compare/v0.2.0...v0.3.0)

### Features

* **api:** api update ([#22](https://github.com/reductoai/reducto-node-sdk/issues/22)) ([630ac4d](https://github.com/reductoai/reducto-node-sdk/commit/630ac4d1af86f0571741d9fc996a96995c50007d))
* **api:** api update ([#23](https://github.com/reductoai/reducto-node-sdk/issues/23)) ([56d80e3](https://github.com/reductoai/reducto-node-sdk/commit/56d80e39ee31c2930783d823e067fc112cda3455))
* **api:** api update ([#24](https://github.com/reductoai/reducto-node-sdk/issues/24)) ([2574f5d](https://github.com/reductoai/reducto-node-sdk/commit/2574f5de02de2c9df0ca0b8de825442f46766ad3))
* **api:** api update ([#27](https://github.com/reductoai/reducto-node-sdk/issues/27)) ([6cc4e9c](https://github.com/reductoai/reducto-node-sdk/commit/6cc4e9c194a5e779fc4890d497c2221fa8d1b3ed))


### Bug Fixes

* avoid type error in certain environments ([#28](https://github.com/reductoai/reducto-node-sdk/issues/28)) ([546c952](https://github.com/reductoai/reducto-node-sdk/commit/546c9524d72028cffec40b9c6973c6628ae37546))


### Chores

* **exports:** cleaner resource index imports ([#25](https://github.com/reductoai/reducto-node-sdk/issues/25)) ([977f7a8](https://github.com/reductoai/reducto-node-sdk/commit/977f7a81cb37804613fc35532461a5dcb1476367))
* **exports:** stop using path fallbacks ([#26](https://github.com/reductoai/reducto-node-sdk/issues/26)) ([3b10332](https://github.com/reductoai/reducto-node-sdk/commit/3b1033256931afdb55f5bd8e7efe444d8390c1c9))

## 0.2.0 (2025-03-15)

Full Changelog: [v0.1.0...v0.2.0](https://github.com/reductoai/reducto-node-sdk/compare/v0.1.0...v0.2.0)

### Features

* add SKIP_BREW env var to ./scripts/bootstrap ([#15](https://github.com/reductoai/reducto-node-sdk/issues/15)) ([b65224e](https://github.com/reductoai/reducto-node-sdk/commit/b65224e425b763348cb374146c89760b0cafac3d))
* **api:** api update ([#18](https://github.com/reductoai/reducto-node-sdk/issues/18)) ([8d7f4e0](https://github.com/reductoai/reducto-node-sdk/commit/8d7f4e0f99b8c6c9f13b90f2243837a7ab26c3fd))
* **client:** accept RFC6838 JSON content types ([#17](https://github.com/reductoai/reducto-node-sdk/issues/17)) ([4da9c07](https://github.com/reductoai/reducto-node-sdk/commit/4da9c074d07b96a90a38b25b9e5215fdd1619d32))


### Chores

* **internal:** remove extra empty newlines ([#19](https://github.com/reductoai/reducto-node-sdk/issues/19)) ([dd0554d](https://github.com/reductoai/reducto-node-sdk/commit/dd0554d51761fb3e4e7450fb649203b450798bd5))

## 0.1.0 (2025-03-10)

Full Changelog: [v0.1.0-alpha.1...v0.1.0](https://github.com/reductoai/reducto-node-sdk/compare/v0.1.0-alpha.1...v0.1.0)

### Features

* **api:** api update ([#13](https://github.com/reductoai/reducto-node-sdk/issues/13)) ([283e8bc](https://github.com/reductoai/reducto-node-sdk/commit/283e8bc6ac41bff32d7b6747df25a323b46b9901))
* **api:** api update ([#9](https://github.com/reductoai/reducto-node-sdk/issues/9)) ([1c99e9b](https://github.com/reductoai/reducto-node-sdk/commit/1c99e9b555c0ffb3180cc4df26624bdc76765cef))
* **api:** manual updates ([#8](https://github.com/reductoai/reducto-node-sdk/issues/8)) ([1913549](https://github.com/reductoai/reducto-node-sdk/commit/191354923c5515897fe1e52d2e2430ffdb5514cf))
* **api:** update via SDK Studio ([#5](https://github.com/reductoai/reducto-node-sdk/issues/5)) ([09a1bd5](https://github.com/reductoai/reducto-node-sdk/commit/09a1bd5ab71e901777d67db4270bf0067f4bba8f))
* **api:** update via SDK Studio ([#7](https://github.com/reductoai/reducto-node-sdk/issues/7)) ([007fa96](https://github.com/reductoai/reducto-node-sdk/commit/007fa96888e54cfeac14138c7c664baf1b771216))


### Chores

* remove custom code ([924d95c](https://github.com/reductoai/reducto-node-sdk/commit/924d95c80e20d87696458092480433061238e5c6))
* update SDK settings ([#11](https://github.com/reductoai/reducto-node-sdk/issues/11)) ([9550f19](https://github.com/reductoai/reducto-node-sdk/commit/9550f19886b67fb960f23add9250d3a1008916ab))


### Documentation

* update URLs from stainlessapi.com to stainless.com ([#10](https://github.com/reductoai/reducto-node-sdk/issues/10)) ([bb7eb3e](https://github.com/reductoai/reducto-node-sdk/commit/bb7eb3e8a756364c7fb79479e1e0faa7dbf9327c))

## 0.1.0-alpha.1 (2025-02-25)

Full Changelog: [v0.0.1-alpha.0...v0.1.0-alpha.1](https://github.com/reductoai/reducto-node-sdk/compare/v0.0.1-alpha.0...v0.1.0-alpha.1)

### Features

* **api:** update via SDK Studio ([88816c6](https://github.com/reductoai/reducto-node-sdk/commit/88816c6a06f17ec3fe90f92bff6d21e121d2e7fb))
* **api:** update via SDK Studio ([ca39775](https://github.com/reductoai/reducto-node-sdk/commit/ca397759182a402c2f32e8cf32083c67feff12f3))


### Chores

* configure new SDK language ([f378270](https://github.com/reductoai/reducto-node-sdk/commit/f3782700dfc648a5666db385848f67b05e3792dc))
* go live ([#1](https://github.com/reductoai/reducto-node-sdk/issues/1)) ([f4e01df](https://github.com/reductoai/reducto-node-sdk/commit/f4e01df626ba339ae401266b6a1bc36ce9c5814e))
* update SDK settings ([#3](https://github.com/reductoai/reducto-node-sdk/issues/3)) ([c625ac0](https://github.com/reductoai/reducto-node-sdk/commit/c625ac060d8188276544e0a705a302253908cf26))
