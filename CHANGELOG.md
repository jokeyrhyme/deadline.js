# Changelog


## v1.1.1 - 2015-09-14


### Fixed

- `deadline.callback()` no longer returns an undocumented Promise


## v1.1.0 - 2015-08-10


### Added

- new `deadline.fn()` utility method, primarily aimed at making sure event
  handlers execute, even if registering the handler too late
