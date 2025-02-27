## Navigation

- [Parsing](#parsing)
- [Using a result](#using-a-result)
- [Inputs](#inputs)
- [Outputs](#outputs)
- [Contrubuting](#contributing)
- [Maintenance](#maintenance)
  - [Regular flow](#regular-flow)
  - [Prerelease from](#prerelease-flow)
  - [Conventions](#conventions)

## Parsing

```yml
steps:
  # 1. from current date
  - name: Get current unix timestamp
    id: timestamp
    uses: release-kit/unix-timestamp@v1
  
  # 2. from specified date
  - name: Get unix timestamp from specified date
    id: timestamp
    uses: release-kit/unix-timestamp@v1
    with:
      date: '2024-06-29T13:03:17.253Z'
```

## Using a result

```yml
- name: Use unix timestamp
  run: echo "${{ steps.timestamp.outputs.timestamp }}"
```

Check out the [Outputs](#outputs) section for the full description.

## Inputs

- `date` (optional, defaults to current date) - a date to be converted to unix timestamp

## Outputs

- `timestamp` - unix timestamp (example: `1719666339840`)

## Contributing

1. Fork this repo
2. Use the [Regular flow](#regular-flow)

Please follow [Conventions](#conventions)

## Maintenance

The dev branch is `main` - any developer changes is merged in there.

Also, there is a `release/latest` branch. It always contains the actual source code for release published with `latest` tag.

All changes is made using Pull Requests - push is forbidden. PR can be merged only after successfull `test-and-build` workflow checks.

When PR is merged, `release-drafter` workflow creates/updates a draft release. The changelog is built from the merged branch scope (`feat`, `fix`, etc) and PR title. When release is ready - we publish the draft.

Then, the `release` workflow handles everything:

- It runs tests, builds a package, and publishes it
- It synchronizes released tag with `release/latest` branch

### Regular flow

1. Create [feature branch](#conventions)
2. Make changes in your feature branch and [commit](#conventions)
3. Create a Pull Request from your feature branch to `main`  
   The PR is needed to test the code before pushing to release branch
4. If your PR contains breaking changes, don't forget to put a `BREAKING CHANGES` label
5. Merge the PR in `main`
6. All done! Now you have a drafted release - just publish it when ready

### Prerelease flow

1. Assume your prerelease tag is `beta`
2. Create `release/beta` branch
3. Create [feature branch](#conventions)
4. Make changes in your feature branch and [commit](#conventions)
5. Create a Pull Request from your feature branch to `release/beta`  
   The PR is needed to test the code before pushing to release branch
6. Create Github release with tag like `v1.0.0-beta`, pointing to `release/beta` branch  
   For next `beta` versions use semver build syntax: `v1.0.0-beta+1`  
7. After that, the `release` workflow will publish your package with the `beta` tag
8. When the `beta` version is ready to become `latest` - create a Pull Request from `release/beta` to `main` branch
9. Continue from the [Regular flow's](#regular-flow) #5 step

### Conventions

**Feature branches**:
- Should start with `feat/`, `fix/`, `docs/`, `refactor/`, and etc., depending on the changes you want to propose (see [pr-labeler.yml](./.github/pr-labeler.yml) for a full list of scopes)

**Commits**:
- Should follow the [Conventional Commits specification](https://www.conventionalcommits.org)

**Pull requests**:
- Should have human-readable name, for example: "Add a TODO list feature"
- Should describe changes
- Should have correct labels
