using HairSalonSystem.Repositories.Interfaces; 
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;


namespace HairSalonSystem.Implement
{
    public class UnitOfWork<TContext> : IUnitOfWork<TContext> where TContext : DbContext
    {
        public TContext Context { get; }
        private Dictionary<Type, object> _repositories = new Dictionary<Type, object>(); // Initialized to avoid nullability issues

        public UnitOfWork(TContext context)
        {
            Context = context;
        }

        public IGenericRepository<TEntity> GetRepository<TEntity>() where TEntity : class
        {
            if (_repositories.TryGetValue(typeof(TEntity), out object repository))
            {
                return (IGenericRepository<TEntity>)repository;
            }

            repository = new GenericRepository<TEntity>(Context);
            _repositories.Add(typeof(TEntity), repository);
            return (IGenericRepository<TEntity>)repository;
        }

        public void Dispose()
        {
            Context?.Dispose();
        }

        public int Commit()
        {
            TrackChanges();
            return Context.SaveChanges();
        }

        public async Task<int> CommitAsync()
        {
            TrackChanges();
            return await Context.SaveChangesAsync();
        }

        private void TrackChanges()
        {
            var validationErrors = Context.ChangeTracker.Entries<IValidatableObject>()
                .SelectMany(e => e.Entity.Validate(null))
                .Where(e => e != ValidationResult.Success)
                .ToArray();
            if (validationErrors.Any())
            {
                var exceptionMessage = string.Join(Environment.NewLine,
                    validationErrors.Select(error => $"Properties {string.Join(", ", error.MemberNames)} Error: {error.ErrorMessage}"));
                throw new Exception(exceptionMessage);
            }
        }
    }
}
