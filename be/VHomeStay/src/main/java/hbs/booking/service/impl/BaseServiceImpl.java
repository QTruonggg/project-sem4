package hbs.booking.service.impl;

import hbs.booking.util.exception.ResourceNotFoundException;
import hbs.booking.repository.BaseRepository;
import hbs.booking.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class BaseServiceImpl<T, ID, R extends BaseRepository<T, ID>>
        implements BaseService<T, ID>
{
    @Autowired
    private R repository;

    @Override
    public Optional<T> findById(ID id) throws ResourceNotFoundException {
        Optional<T> optional = repository.findById(id);
        if(optional.isEmpty()){
            throw new ResourceNotFoundException("Requested customer does not exist");
        }
        return optional;
    }

    @Override
    public List<T> findAll() {
        return repository.findAll();
    }
}
