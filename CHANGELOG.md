# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [2.1.3] - 2023-03-19

### Security

-   Upgraded `minimist`.

## [2.1.2] - 2022-01-15

### Fixed

-   `NOMEN_PART_CLASSES` was not being exported properly.

## [2.1.1] - 2022-01-15

### Added

-   Documentation for `NOMEN_PART_CLASSES`.

## [2.1.0] - 2022-01-15

### Added

-   Constant with all nomen part classes (`NOMEN_PART_CLASSES`).
-   `NomenPartClass` in exported types.

## Changed

-   Returned data is read-only.

## [2.0.0] - 2022-01-15

### Changed

-   Using type unions instead of enums.
-   Using ESLint/Prettier instead of TSLint.
-   Upgraded dependencies.

## [1.3.0] - 2019-03-11

### Added

-   Handling for _Candidatus_.
-   Handling for names in quotes.

## [1.2.0] - 2019-03-10

### Changed

-   No longer allowing parts without classes.

### Fixed

-   Fixed up build process, adding linting.

## [1.1.1] - 2018-09-26

### Fixed

-   Error in build process prevented declaration files from being copied over.

## [1.1.0] - 2018-05-02

### Added

-   Enum for nomen part classes (`NomenPartClass`).

### Changed

-   Specific and subspecific names may be followed by "incertae" or "indet.".
-   Code is in multiple files.
-   Refactored code.

## [1.0.0] - 2018-03-30

### Added

-   Initial version.
