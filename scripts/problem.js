Given a collection of documents like this, I want to delete 'bored' state from member 'b'. 
Without knowing the array index of member b.

doc = {'_id': ObjectID(),
       'name': 'the_name',
       'location': 'the_location',
       'members': [{'membername': 'a',
                    'membernum          ': '13',
                    'states': ['hungry', 'tired', 'happy']},
                    
                    {'membername': 'b',
                    'membernum': '8',
                    'states': ['bored', 'glad']}]
      }
If I knew the array index, I would use the code below, 
but I don't know how to change that to a situation where I only know the member name.

doc.update({name:'the_name'},
           {"$unset": {"members.1.states.0": 1});
doc.update({name:'the_name'},
           {"$pull": {"members.1.states": null}});

Is it possible to delete a specific element from an array in an array of subdocuments?

thanks,
--Tim


/** 
 * Info
 *
 */

db.test.find({'members.membername':'b'}, {$pull:{'members.$.states':'bored'}});

El truco está en members.$.states
Pero sí está interesante, porque no recuerdo haber visto ese uso de $ (aunque viéndolo en acción medio se entiende). Aquí está la documentación:
https://docs.mongodb.com/manual/reference/operator/update/positional/#up._S_

$ representa al 1er elemento que hizo match al query.
• NO se pueden usar múltiples $ para navegar varios arrays (arrays dentro de arrays), ya que todos tendrían el mismo valor.
• NO usar $ así con upsert.
• Hay un buen de casos especiales para negations, para que los chequen.


https://docs.mongodb.com/manual/core/aggregation-pipeline/#aggregation-pipeline-operators-and-performance
https://docs.mongodb.com/manual/core/aggregation-pipeline-optimization/
https://docs.mongodb.com/manual/aggregation/
https://docs.mongodb.com/manual/sharding/
https://www.mkyong.com/mongodb/mongodb-aggregate-and-group-example/
https://docs.mongodb.com/manual/reference/operator/update/positional/#up._S_
http://www.slideshare.net/NorbertoLeite/mongodb-certification-study-group-may-2016
https://www.research.net/r/PRZ8CXH
https://docs.mongodb.com/manual/core/index-hashed/
https://docs.mongodb.com/manual/tutorial/deploy-shard-cluster/
https://github.com/nleite?tab=repositories
