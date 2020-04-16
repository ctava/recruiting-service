export class TypeORMError extends Error {
    constructor(public code: number, public stack: string, ) {
      super(stack);
    }
  }

export class UniqueKeyViolation extends TypeORMError {
    constructor(entity) {
        super(400, 'Entity already exists ' + entity.id);
    }
}
