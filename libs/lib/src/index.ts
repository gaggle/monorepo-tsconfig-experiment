export class Lib {
  // This is here to highlight tsconfig.json behaviour,
  // consider it part of code we haven't had time to clean up yet
  uninitializedProperty: string

  foo () {
    console.log('foo')
  }
}
