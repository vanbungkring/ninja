module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable(
      'data', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: {
          type: DataTypes.DATE
        },
        updatedAt: {
          type: DataTypes.DATE
        },
        attr1: DataTypes.STRING,
        attr2: DataTypes.INTEGER,
        attr3: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false
        }
      }
    )
    // add altering commands here, calling 'done' when finished
    done()
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    done()
  }
}