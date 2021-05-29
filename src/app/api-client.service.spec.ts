import { ApiClientService } from './api-client.service';
import { LoggerService } from './logger.service';
import { Pokemon } from './pokemon-types';
import { asyncData } from './testing/async-observable-helpers';

describe('ApiClientService', () => {
  let service: ApiClientService;
  let httpClientSpy: { get: jasmine.Spy };
  let logger: { info: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    logger = jasmine.createSpyObj('logger', ['info']);
    service = new ApiClientService(
      logger as jasmine.SpyObj<LoggerService>,
      httpClientSpy as any
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected Pokemon Array (HttpClient called once). Logger called once with `fetching pokemons` message', (done: DoneFn) => {
    const expectedPokemon: Pokemon[] = [{ name: 'A' }, { name: 'B' }];
    httpClientSpy.get.and.returnValue(asyncData({ results: expectedPokemon }));

    service.getPokemons().subscribe((pokemon) => {
      expect(pokemon).toEqual(expectedPokemon, 'pokemon as expected');
      done();
    }, done.fail);
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    expect(logger.info.calls.count()).toBe(1, 'one call');
  });
});
